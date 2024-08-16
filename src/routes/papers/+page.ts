import type { PageLoad } from './$types';
import {
	sheetToJson,
	PAPERS_TSV,
	VENUES_TSV,
	PEOPLE_TSV,
	PapersPrep,
	VenuesPrep,
	PeoplePrep,
	sheetGet
} from '../../lib/data';

export const load: PageLoad = async ({ fetch }) => {
	const [papers, venues, people] = await Promise.all([
		sheetGet(PAPERS_TSV, fetch).then((x) => sheetToJson(x, PapersPrep)),
		sheetGet(VENUES_TSV, fetch).then((x) => sheetToJson(x, VenuesPrep)),
		sheetGet(PEOPLE_TSV, fetch).then((x) => sheetToJson(x, PeoplePrep))
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
