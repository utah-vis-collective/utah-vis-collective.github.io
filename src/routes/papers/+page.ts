import type { PageLoad } from './$types';
import {
	sheetToJson,
	PAPERS_TSV,
	VENUES_TSV,
	PEOPLE_TSV,
	PapersPrep,
	VenuesPrep,
	PeoplePrep
} from '../../lib/data';

export const load: PageLoad = async ({ fetch }) => {
	const get = async (url: string) =>
		fetch(url, { headers: { 'cache-control': 'public, max-age=3600' } }).then((res) => res.text());
	const [papers, venues, people] = await Promise.all([
		get(PAPERS_TSV).then((x) => sheetToJson(x, PapersPrep)),
		get(VENUES_TSV).then((x) => sheetToJson(x, VenuesPrep)),
		get(PEOPLE_TSV).then((x) => sheetToJson(x, PeoplePrep))
	]);

	const pairs = papers
		.sort((a, b) => {
			const aDate = new Date(a.pubDate);
			const bDate = new Date(b.pubDate);
			return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
		})
		.map((paper) => {
			const venue = venues.find((x) => x.nickname === paper.venue)!;
			const authors = paper.authors.map((author) => {
				const person = people.find((x) => x.lookupName === author);
				return person || author;
			});
			paper.authors = authors;
			return { venue, paper };
		});

	return { pairs };
};
