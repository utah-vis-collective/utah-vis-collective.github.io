<script lang="ts">
	import type { Person } from '$lib/app-types';
	import { displayName } from '$lib/display-name';
	import { base } from '$app/paths';
	import PeopleList from './people-list.svelte';

	export let data: { people: Person[] };

	$: groupsByPosition = data.people
		.slice()
		.sort((a: Person, b: Person) => {
			const u = a.displayName.split(' ').at(-1) || a.displayName;
			const v = b.displayName.split(' ').at(0) || b.displayName;
			return u < v ? -1 : u > v ? 1 : 0;
		})
		.reduce(
			(acc, person) => {
				if (person.visible) {
					if (!acc[person.position]) {
						acc[person.position] = [];
					}
					acc[person.position].push(person);
				}
				return acc;
			},
			{} as Record<Person['position'], Person[]>
		);

	$: members = [...(groupsByPosition['Faculty'] || []), ...(groupsByPosition['PhD Student'] || [])];
	function getUrl(url: string) {
		if (url.startsWith('http')) {
			return url;
		}
		return `${base}/${url}`;
	}
</script>

<svelte:head>
	<title>UVC | People</title>
	<!-- preload people images -->
	{#each members as person}
		<link rel="preload" as="image" href={getUrl(person.image)} />
	{/each}
</svelte:head>

<div class="lead">members</div>
<div class="flex-wrap flex w-full justify-center">
	{#each members as person}
		<div class="mt-2 flex flex-col w-[220px] min-h-[220px] items-center mx-4">
			<a class="block grow-0 shrink-0" href={person.url}>
				<img
					src={getUrl(person.image)}
					class="h-[220px] rounded-full"
					on:error={(e) => {
						// @ts-ignore
						e.target.src = '/images/people/placeholder.png';
					}}
					alt={`head shot of ${displayName(person)}`}
				/>
			</a>
			<div class="ml-2">
				<div class="font-semibold">
					<a class="at" href={person.url}>{displayName(person)}</a>
				</div>
				<div class="italic">{person.position}</div>
				<!-- <div class="text-sm">{person.interests}</div> -->
			</div>
		</div>
	{/each}
</div>

<!-- <div class="lead mt-6">alumni</div>
<PeopleList people={groupsByPosition['Alumni'] || []} /> -->

<div class="lead mt-6">collaborators</div>
<PeopleList
	people={groupsByPosition['Collaborator'].sort((a, b) =>
		(a.lookupName.split(' ').at(-1) || '').localeCompare(b.lookupName.split(' ').at(-1) || '')
	)}
/>
