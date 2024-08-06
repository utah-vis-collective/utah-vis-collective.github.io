import type { PageLoad } from './papers/$types';

import {
	sheetToJson,
	PAPERS_TSV,
	VENUES_TSV,
	PEOPLE_TSV,
	NEWS_TSV,
	FEATURE_VENUES_TSV,
	PapersPrep,
	VenuesPrep,
	PeoplePrep,
	NewsPrep,
	FeatureVenuesPrep
} from '../lib/data';

export const load: PageLoad = async ({ fetch }) => {
	const get = async (url: string) =>
		fetch(url, { headers: { 'cache-control': 'public, max-age=3600' } }).then((res) => res.text());
	const [prePapers, venues, news, featuredVenues, people] = await Promise.all([
		get(PAPERS_TSV).then((x) => sheetToJson(x, PapersPrep)),
		get(VENUES_TSV).then((x) => sheetToJson(x, VenuesPrep)),
		get(NEWS_TSV).then((x) => sheetToJson(x, NewsPrep)),
		get(FEATURE_VENUES_TSV).then((x) => sheetToJson(x, FeatureVenuesPrep)),
		get(PEOPLE_TSV).then((x) => sheetToJson(x, PeoplePrep))
	]);
	const papers = prePapers.map((paper) => {
		const venue = venues.find((x) => x.nickname === paper.venue)!;
		const authors = paper.authors.map((author) => {
			if (typeof author !== 'string') {
				return author;
			}
			const person = people.find((x) => x.displayName === author || x.lookupName === author);
			return person || author;
		});
		return { venue, paper: { ...paper, authors } };
	});

	const groupedPapersPre = featuredVenues
		.filter(({ visible }) => visible)
		.reverse()
		.map((x) => {
			const featureYear = Number(x.year);
			const featureVenue = x.venue_nickname;
			const filteredPapers = papers.filter(({ paper, venue }) => {
				return venue.nickname === featureVenue && paper.year === featureYear;
			});
			if (filteredPapers.length === 0) {
				console.error(x.desc, 'has no papers');
			}
			return {
				papers: filteredPapers,
				event: x.desc
			};
		});

	// merge papers with the same venue and year
	const groupedPapers = [] as typeof groupedPapersPre;
	for (const { papers, event } of groupedPapersPre) {
		const existing = groupedPapers.find((x) => x.event === event);
		if (existing) {
			existing.papers.push(...papers);
		} else {
			groupedPapers.push({ papers, event });
		}
	}
	// within each group, sort papers by title
	groupedPapers.forEach(({ papers }) => {
		papers.sort((a, b) => {
			// trim the a's and the's from the beginning of the title
			const titleA = a.paper.title.toLowerCase().replace(/^(a|the|an) /i, '');
			const titleB = b.paper.title.toLowerCase().replace(/^(a|the|an) /i, '');
			return titleA.localeCompare(titleB);
		});
	});

	const spotlight = groupedPapers.flatMap(({ papers }) => {
		return papers
			.map(({ paper }) => ({
				title: paper.title,
				paper: paper.webName,
				image: paper.figure,
				visible: true
			}))
			.filter((x) => x.image);
	});

	return { groupedPapers, news, spotlight };
};
