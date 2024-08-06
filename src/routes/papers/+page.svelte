<script lang="ts">
	import type { Paper, Venue } from '../../lib/app-types';
	import SmallPaper from '../../lib/small-paper.svelte';

	type Pair = { paper: Paper; venue: Venue };

	export let data: { pairs: Pair[] };

	$: sectionedPapers = data.pairs.reduce(
		(acc, x) => {
			if (!acc[x.paper.year]) {
				acc[x.paper.year] = [];
			}
			acc[x.paper.year].push(x);
			return acc;
		},
		{} as Record<string, Pair[]>
	);

	// const utahColors = ['#708E99', '#FFB81D', '#890000', '#6CC24A', '#3ABFC0', '#E2E6E6'];
</script>

<svelte:head>
	<title>UVC | Papers</title>
</svelte:head>

<div class="md:pr-10">
	{#each Object.keys(sectionedPapers).sort().reverse() as year}
		<div class="heading">{year}</div>
		{#each sectionedPapers[year] as { paper, venue }}
			<SmallPaper {paper} {venue} />
		{/each}
	{/each}
</div>
