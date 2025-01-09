<script lang="ts">
	import type { News, Person } from '$lib/app-types';
	import Markdown from '$lib/markdown.svelte';
	import PeopleList from '../lib/people-list.svelte';

	export let data: {
		news: News[];
		people: Person[];
	};

	function toDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			timeZone: 'UTC',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

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

	const labs = [
		{ name: 'TDAVIS Lab', director: 'Wang Philips', url: 'https://www.sci.utah.edu/~beiwang/' },
		{ name: 'HAVOC Lab', director: 'McNutt', url: 'http://mcnutt.in/' },
		{ name: 'Isaacs Lab', director: 'Isaacs', url: 'https://kisaacs.github.io/' },
		{ name: 'Rosen Lab', director: 'Rosen', url: 'https://cspaul.com/' },
		{ name: 'Visualization Design Lab', director: 'Lex', url: 'https://vdl.sci.utah.edu/' }
	];
</script>

<div class="mission md:text-xl md:-mt-1 mb-4">
	We are a group of researchers and students at the University of Utah who are interested in the
	visual representation of data, interfaces with data, human-factors, as well as related topics and
	domain. Our research spans a wide range of areas, including human-computer interaction,
	information visualization, topology, super computing, and programming interfaces. We are part of
	the <a href="https://www.cs.utah.edu/">School of Computing</a> and are affiliated with the
	<a href="https://www.sci.utah.edu/">Scientific Computing and Imaging Institute</a>.
</div>

<div class="mt-6 md:flex">
	<div class="flex-col basis-3/12 pt-3 border-t md:pt-0 md:border-t-0">
		<section>
			<div class="lead">Updates</div>
			{#each data.news.reverse() as item}
				<div class="update text-sm mb-3">
					<div class="italic">{toDate(item.date)}</div>
					<Markdown content={item.text} />
				</div>
			{/each}
		</section>
	</div>
</div>

<div class="lead">Sub Groups</div>
<div class="text-sm mb-4">
	UVC is composed of several labs, each with its own focus and research interests.
</div>
<div class="flex-wrap flex w-full justify-between">
	{#each labs as lab}
		<div class="flex flex-col justify-center items-center w-48 m-8">
			<a class="font-bold" href={lab.url}>{lab.name}</a> ({lab.director})
		</div>
	{/each}
</div>

<!-- <div class="lead mt-8">PIs</div>
<div class="flex-wrap flex w-full justify-center">
	{#each [...(groupsByPosition['Faculty'] || [])] as person}
		<PersonComponent {person} />
	{/each}
</div> -->
<!-- 
<div class="lead">Students</div>
<div class="flex-wrap flex w-full justify-center">
	{#each students as person}
		<PersonComponent {person} />
	{/each}
</div> -->

<!-- <div class="lead mt-6">alumni</div>
<PeopleList people={groupsByPosition['Alumni'] || []} /> -->

<div class="lead mt-6">Friends of the Collective</div>
<PeopleList
	people={(groupsByPosition['Friend'] || []).sort((a, b) =>
		(a.lookupName.split(' ').at(-1) || '').localeCompare(b.lookupName.split(' ').at(-1) || '')
	)}
/>
