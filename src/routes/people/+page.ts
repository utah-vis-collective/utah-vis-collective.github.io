import type { PageLoad } from './$types';
import { sheetToJson, PEOPLE_TSV, PeoplePrep } from '../../lib/data';

export const load: PageLoad = async ({ fetch }) => {
	const get = async (url: string) =>
		fetch(url, { headers: { 'cache-control': 'public, max-age=3600' } }).then((res) => res.text());
	const [people] = await Promise.all([get(PEOPLE_TSV).then((x) => sheetToJson(x, PeoplePrep))]);

	return { people };
};
