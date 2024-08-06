import { tsvParse } from 'd3-dsv';
import type { DSVRowString } from 'd3-dsv';
import type { Venue, Person, Paper, News } from './app-types';

export const PEOPLE_TSV =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8MS9MQ2pMoafkoJbTRoB-6Pdqd5Rf9yPMiW39DENWNRyOukJMmvKNhMvzNrmt2k0I194STGL_S18r/pub?gid=1188548341&single=true&output=tsv';
export const PAPERS_TSV =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8MS9MQ2pMoafkoJbTRoB-6Pdqd5Rf9yPMiW39DENWNRyOukJMmvKNhMvzNrmt2k0I194STGL_S18r/pub?output=tsv';
export const VENUES_TSV =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8MS9MQ2pMoafkoJbTRoB-6Pdqd5Rf9yPMiW39DENWNRyOukJMmvKNhMvzNrmt2k0I194STGL_S18r/pub?gid=1013515739&single=true&output=tsv';
export const NEWS_TSV =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8MS9MQ2pMoafkoJbTRoB-6Pdqd5Rf9yPMiW39DENWNRyOukJMmvKNhMvzNrmt2k0I194STGL_S18r/pub?gid=2101916522&single=true&output=tsv';

export const FEATURE_VENUES_TSV =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8MS9MQ2pMoafkoJbTRoB-6Pdqd5Rf9yPMiW39DENWNRyOukJMmvKNhMvzNrmt2k0I194STGL_S18r/pub?gid=1523530879&single=true&output=tsv';
export function sheetToJson<A>(x: string, mapper: (x: DSVRowString<string>) => A) {
	return tsvParse(x)
		.filter((x) => x['column'] !== 'description')
		.map((x) => mapper(x));
}
export const PeoplePrep = (x: DSVRowString<string>): Person => {
	return {
		lookupName: x['LookupName'],
		displayName: x['DisplayName'],
		url: x['url'],
		position: x['position'] as Person['position'],
		visible: x['Visible'].toUpperCase() === 'TRUE',
		image: x['image']
	};
};
export const parseMarkdownLinks = (x: string) => {
	const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
	const links = [];
	let match;
	while ((match = regex.exec(x))) {
		links.push({ name: match[1], link: match[2] });
	}
	return links;
};
export const PapersPrep = (x: DSVRowString<string>): Paper => {
	return {
		abstract: x['abstract'],
		authors: x['authors'].split(',').map((x) => x.trim()),
		caption: x['caption'],
		doi: x['doi'],
		links: parseMarkdownLinks(x['materials']),
		pubDate: x['pubDate'],
		title: x['title'],
		type: x['type'] as Paper['type'],
		venue: x['venue'],
		webName: x['webName'],
		year: +x['year'],
		thumbnail: x['thumbnail'],
		figure: x['figure']
	};
};
export const VenuesPrep = (x: DSVRowString<string>): Venue => {
	return {
		fullName: x['fullName'],
		nickname: x['nickname'],
		venueType: x['venueType'] as Venue['venueType']
	};
};

export const NewsPrep = (x: DSVRowString<string>): News => {
	return {
		date: x['date'],
		text: x['text'],
		visible: x['visible'].toUpperCase() === 'TRUE'
	};
};

export const FeatureVenuesPrep = (x: DSVRowString<string>) => {
	return {
		desc: x['desc'],
		venue_nickname: x['venue_nickname'],
		year: x['year'],
		visible: x['visible'].toUpperCase() === 'TRUE'
	};
};
