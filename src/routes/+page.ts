import type { PageLoad } from './papers/$types';

import {
	sheetToJson,
	PAPERS_TSV,
	VENUES_TSV,
	NEWS_TSV,
	FEATURE_VENUES_TSV,
	PapersPrep,
	VenuesPrep,
	NewsPrep,
	FeatureVenuesPrep
} from '../lib/data';

export const load: PageLoad = async ({ fetch }) => {
	const get = async (url: string) =>
		fetch(url, { headers: { 'cache-control': 'public, max-age=3600' } }).then((res) => res.text());
	const [prePapers, venues, news, featuredVenues] = await Promise.all([
		get(PAPERS_TSV).then((x) => sheetToJson(x, PapersPrep)),
		get(VENUES_TSV).then((x) => sheetToJson(x, VenuesPrep)),
		get(NEWS_TSV).then((x) => sheetToJson(x, NewsPrep)),
		get(FEATURE_VENUES_TSV).then((x) => sheetToJson(x, FeatureVenuesPrep))
	]);
	const papers = prePapers.map((paper) => {
		const venue = venues.find((x) => x.nickname === paper.venue)!;
		return { venue, paper };
	});

	const groupedPapers = featuredVenues
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

	const spotlight = groupedPapers.flatMap(({ papers }) => {
		return papers.map(({ paper }) => {
			return {
				title: paper.title,
				paper: paper.webName,
				image: paper.figure,
				visible: true
			};
		});
	});

	return { groupedPapers, news, spotlight };
};
