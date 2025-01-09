<script lang="ts">
	import type { Person } from '$lib/app-types';
	export let person: Person;
	import { displayName } from '$lib/display-name';
	import { base } from '$app/paths';

	function getUrl(person: Person) {
		const url = person.image;
		if (!url || isErrored) {
			return '/images/people/missing-person.png';
		}
		if (url.startsWith('http')) {
			return url;
		}
		return `${base}/${url}`;
	}
	let isErrored = false;
</script>

<div class="mt-2 flex flex-col w-[160px] min-h-[160px] items-center mx-4 mb-8">
	{#if person.url && !isErrored}
		<a class="block grow-0 shrink-0" href={person.url}>
			<img
				src={getUrl(person)}
				class="h-[160px] rounded-full object-cover"
				on:error={(e) => {
					console.log(e);
					// @ts-ignore
					isErrored = true;
				}}
				alt={`head shot of ${displayName(person)}`}
			/>
		</a>
	{:else}
		<img
			src={getUrl(person)}
			class="h-[160px] rounded-full object-cover"
			on:error={(e) => {
				console.log(e);
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
