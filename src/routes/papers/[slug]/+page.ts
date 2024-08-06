import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { sheetToJson, PAPERS_TSV, VENUES_TSV, PapersPrep, VenuesPrep } from '../../../lib/data';

export const load: PageLoad = async ({ params, fetch }) => {
	const get = async (url: string) =>
		fetch(url, { headers: { 'cache-control': 'public, max-age=3600' } }).then((res) => res.text());
	const [papers, venues] = await Promise.all([
		get(PAPERS_TSV).then((x) => sheetToJson(x, PapersPrep)),
		get(VENUES_TSV).then((x) => sheetToJson(x, VenuesPrep))
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
