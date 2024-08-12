<script lang="ts">
	import { slide } from 'svelte/transition';
	import markdownit from 'markdown-it';
	const md = markdownit({
		html: true,
		linkify: true,
		typographer: true
	});

	import { base } from '$app/paths';
	import type { Paper, Venue } from './app-types';
	import AuthorList from './author-list.svelte';
	import Materials from './materials.svelte';
	export let paper: Paper;
	export let venue: Venue;
	let abstractOpen = false;
	let altText = 'thumbnail image for ' + paper.title;
	let image = paper.thumbnail || '/images/thumbs/missing-paper.png';
</script>

<div class="md:flex paper text-[15px]" class:mb-6={!abstractOpen} class:mb-2={abstractOpen}>
	<div class="thumbnail mb-2 md:mt-1 grow-0 shrink-0">
		<a href={`${base}/papers/${paper.webName}`}>
			<img
				class="halo rounded-lg w-[120px]"
				src={image}
				alt={altText}
				on:error={() => {
					// @ts-ignore
					image = '/images/thumbs/missing-paper.png';
					altText = 'missing thumbnail image';
				}}
			/>
		</a>
	</div>
	<div class="md:ml-5 leading-tight">
		<div class="hidden md:block">
			<a class="font-semibold" href={`${base}/papers/${paper.webName}`}>{paper.title}</a>
			<div><AuthorList people={paper.authors} /></div>
			<div class="italic">{venue.fullName}, {paper.year}</div>
			<div class="mt-1"><Materials {paper} /></div>
		</div>
		<div class="md:hidden text-sm leading-tight">
			<a class="font-semibold" href={`${base}/papers/${paper.webName}`}>{paper.title}</a>.
			<AuthorList people={paper.authors} />.
			<span class="italic">{venue.fullName}, {paper.year}</span>
			<div class="mt-1"><Materials {paper} /></div>
		</div>
		<div>
			<button on:click={() => (abstractOpen = !abstractOpen)}>+Abstract</button>
		</div>
	</div>
</div>
{#if abstractOpen}
	<div class="text-sm abstract-content mb-6" transition:slide>
		{@html md.render(paper.abstract)}
	</div>
{/if}
