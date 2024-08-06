export interface Paper {
	title: string;
	year: number;
	abstract: string;
	caption: string;
	webName: string;
	pubDate: string;
	venue: string;
	authors: (string | Person)[];
	links: {
		name: string;
		link: string;
	}[];
	doi: string | null;
	type: 'journal' | 'conference' | 'workshop' | 'book';
	note?: string;
	thumbnail: string;
	figure: string;
}

// export interface SmallPerson {
// 	firstName: string;
// 	lastName: string;
// }

export interface Course {
	name: string;
	level: 'Undergraduate' | 'Graduate';
	link: string;
}

export interface Person {
	lookupName: string;
	displayName: string;
	url: string;
	position: 'Faculty' | 'Alumni' | 'Collaborator' | 'Other' | 'Member';
	visible: boolean;
	image: string;
}

export interface News {
	text: string;
	date: string;
	visible: boolean;
}

export interface Spotlight {
	title: string;
	paper: string;
	image: string;
	visible: boolean;
}

export type FeaturedVenue = {
	desc: string;
	venue_nickname: string;
	year: number;
	visible: boolean;
};

export type Venue = {
	fullName: string;
	nickname: string;
	venueType: 'conference' | 'journal' | 'book' | 'workshop';
};
