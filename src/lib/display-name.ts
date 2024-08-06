import type { Person } from './app-types';

export function displayName(person: Person | string) {
	if (typeof person === 'string') return person;
	return person.displayName;
}
