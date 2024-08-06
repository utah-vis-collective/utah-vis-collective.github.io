<script lang="ts">
	import { base } from '$app/paths';
	import type { Paper } from './app-types';
	export let paper: Paper;

	$: links = paper.links.map((material) => {
		const link = material.link.trim();
		const href = link.startsWith('http') ? link : `${base}/${link}`;
		return { href, label: material.name };
	});
</script>

{#each links as link, idx}
	<span
		>{#if idx}
			<span class="ml-1">|</span>{/if} <a href={link.href}>{link.label}</a></span
	>
{/each}
{#if paper.note}
	| <span class="font-medium">{paper.note}</span>
{/if}
