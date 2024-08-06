<script lang="ts">
	import type { Paper, Venue } from '$lib/app-types';
	import { base } from '$app/paths';

	import AuthorList from '$lib/author-list.svelte';
	import Bibtex from '$lib/bibtex.svelte';
	import Materials from '$lib/materials.svelte';
	import { displayName } from '$lib/display-name';
	export let data: { paper: Paper; venue: Venue };
	$: paper = data.paper;
	$: venue = data.venue;
	let imageError = false;
</script>

<svelte:head>
	<title>UVC | Papers</title>
	<!-- add citation metadata -->
	<meta property="og:title" content={paper.title} />
	<meta property="og:type" content="article" />
	<meta property="og:image" content={`${base}/${paper.figure}`} />
	<meta property="og:url" content={`${base}/papers/${paper.webName}`} />
	<meta name="twitter:card" content="summary" />
	<meta property="twitter:title" content={paper.title} />
	<meta property="twitter:image" content={`${base}/thumbs/${paper.thumbnail}`} />
	<meta property="twitter:image:alt" content="Project thumbnail image." />
	{#if paper.doi}<meta name="citation_doi" content={paper.doi} />{/if}
	<meta name="citation_title" content={paper.title} />
	<meta
		name="citation_{venue.venueType === 'journal' ? 'journal' : 'inbook'}_title"
		content={venue.fullName}
	/>
	<meta name="citation_year" content={`${paper.year}`} />
	<!-- <meta name="citation_pdf_url" content={paper.pdf} /> -->
	{#each paper.authors as author}
		<meta name="citation_author" content={displayName(author)} />
	{/each}
</svelte:head>

<div>
	<h1 class="font-semibold md:text-lg md:leading-snug leading-snug">{paper.title}</h1>

	<div class="md:hidden text-sm mt-1">
		<AuthorList people={paper.authors} />.
		<span class="italic">{venue.fullName}, {paper.year} </span>
	</div>
	<div class="hidden md:block mt-1">
		<div><AuthorList people={paper.authors} /></div>
		<div class="italic">{venue.fullName}, {paper.year}</div>
	</div>

	{#if !imageError}
		<figure class="mt-6">
			<img
				src={paper.figure.startsWith('http') ? paper.figure : `${base}/${paper.figure}`}
				alt={`Figure for ${paper.title}`}
				on:error={() => {
					imageError = true;
				}}
			/>
			<figcaption class="mt-2 text-xs leading-4">
				{paper.caption}
			</figcaption>
		</figure>
	{/if}

	<div>
		<div class="heading mt-6 mb-2 text-xs">Materials</div>
		<div class="text-[15px]"><Materials {paper} /></div>
	</div>

	<div class="abstract">
		<div class="heading mt-6 mb-2 text-xs">Abstract</div>
		<div class="text-[15px]">{paper.abstract}</div>
	</div>

	<div>
		<div class="heading mt-6 mb-2 text-xs">BibTeX</div>
		<Bibtex {paper} {venue} />
	</div>
</div>
