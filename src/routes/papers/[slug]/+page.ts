import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import {
	sheetToJson,
	PAPERS_TSV,
	VENUES_TSV,
	PapersPrep,
	VenuesPrep,
	sheetGet
} from '../../../lib/data';

export const load: PageLoad = async ({ params, fetch }) => {
	const [papers, venues] = await Promise.all([
		sheetGet(PAPERS_TSV, fetch).then((x) => sheetToJson(x, PapersPrep)),
		sheetGet(VENUES_TSV, fetch).then((x) => sheetToJson(x, VenuesPrep))
	]);
	const foundPaper = papers.find((x) => x.webName === params.slug);
	if (!foundPaper) {
		return error(404, `Specific Paper (${params.slug}) Not found`);
	}
	const venue = venues.find((x) => x.nickname === foundPaper.venue)!;
	if (!venue) {
		return error(404, `Venue (${foundPaper.venue}) Not found`);
	}

	return { paper: foundPaper, venue };
};
