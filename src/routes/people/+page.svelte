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

	$: students = [...(groupsByPosition['PhD Student'] || [])].sort((a, b) =>
		(a.lookupName.split(' ').at(-1) || '').localeCompare(b.lookupName.split(' ').at(-1) || '')
	);
	$: members = [...(groupsByPosition['Faculty'] || []), ...students];
	function getUrl(person: Person) {
		const url = person.image;
		if (!url) {
			return '/images/people/missing-person.png';
		}
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
		<link rel="preload" as="image" href={getUrl(person)} />
	{/each}
</svelte:head>

<div class="lead">members</div>
<div class="flex-wrap flex w-full justify-center">
	{#each members as person}
		<div class="mt-2 flex flex-col w-[220px] min-h-[220px] items-center mx-4 mb-8">
			{#if person.url}
				<a class="block grow-0 shrink-0" href={person.url}>
					<img
						src={getUrl(person)}
						class="h-[220px] rounded-full"
						on:error={(e) => {
							// @ts-ignore
							e.target.src = '/images/people/missing-person.png';
						}}
						alt={`head shot of ${displayName(person)}`}
					/>
				</a>
			{:else}
				<img
					src={getUrl(person)}
					class="h-[220px] rounded-full"
					on:error={(e) => {
						// @ts-ignore
						e.target.src = '/images/people/missing-person.png';
					}}
					alt={`head shot of ${displayName(person)}`}
				/>
			{/if}
			<div class="ml-2 text-center">
				<div class="font-semibold">
					<a class="at" href={person.url}>{displayName(person)}</a>
				</div>
				<div class="italic">{person.position}</div>
				{#if person.url}
					<a href={person.url} class="text-sm underline"> homepage </a>
				{/if}
				{#if person.worksWith}
					<div class="text-sm">works with {person.worksWith}</div>
				{/if}
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
