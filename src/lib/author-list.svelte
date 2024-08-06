<script lang="ts">
	import type { Person } from './app-types';
	import { displayName } from './display-name';
	export let people: (Person | string)[];
</script>

{#each people as author, i}
	{#if typeof author === 'object' && 'url' in author}
		<a href={author.url}>{displayName(author)}</a>{i < people.length - 1 ? ', ' : ''}
	{:else if typeof author === 'object'}
		{displayName(author)}{i < people.length - 1 ? ', ' : ''}
	{:else}
		{`${displayName(author)}${i < people.length - 1 ? ', ' : ''}`}
	{/if}
{/each}
