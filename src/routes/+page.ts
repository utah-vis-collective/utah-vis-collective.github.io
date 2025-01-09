import type { PageLoad } from './papers/$types';

import { sheetToJson, PEOPLE_TSV, NEWS_TSV, PeoplePrep, NewsPrep, sheetGet } from '../lib/data';

export const load: PageLoad = async ({ fetch }) => {
	const [people, news] = await Promise.all([
		sheetGet(PEOPLE_TSV, fetch).then((x) => sheetToJson(x, PeoplePrep)),
		sheetGet(NEWS_TSV, fetch).then((x) => sheetToJson(x, NewsPrep))
	]);

	return {
		people: people.filter((x) => x.visible),
		news: news.filter((x) => x.visible).sort((a, b) => a.date.localeCompare(b.date))
	};
};
