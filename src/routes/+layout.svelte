<script>
	import '../app.css';
	import Logo from '$lib/logo.svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	const sections = [
		{
			name: 'home',
			href: `${base}/`
		},

		{
			name: 'people',
			href: `${base}/people`
		},
		{
			name: 'papers',
			href: `${base}/papers`
		}
	];

	$: pageName =
		$page.url.pathname.split('/').filter((x) => x && x !== 'uwdata.github.io')[0] || 'home';
	// $: subtitle = pageName === 'home' ? '' : pageName;
</script>

<div class="w-full flex justify-center">
	<div class="w-full md:max-w-4xl m-0 font-sans px-4 py-3">
		<nav class="md:hidden flex justify-between text-xs uppercase">
			{#each sections as section}
				{#if pageName === section.name}
					<a class="font-semibold" href={section.href}>{section.name}</a>
				{:else}
					<a href={section.href}>{section.name}</a>
				{/if}
			{/each}
		</nav>

		<div class="flex flex-col w-full md:pl-24">
			<header class="flex flex-row justify-between mb-3">
				<div class="text-2xl flex md:text-8xl mt-1">
					<h1 class="font-medium text-utah">
						<a href="/">
							<div>utah vis</div>
							<div>collective</div>
						</a>
					</h1>
					<div class="mb-0.5"><Logo /></div>
				</div>
				<div class="md:hidden w-9">
					<!-- <img src={`${base}/images/logo/idl-300.png`} alt="IDL logo" /> -->
				</div>
			</header>
			<div class="hidden md:flex justify-between static top-0 w-full">
				<nav class="flex mb-4 w-full justify-between">
					{#each sections as section}
						<a class=" font-medium text-xl mb-1.5" href={section.href}>{section.name}</a>
					{/each}
				</nav>
			</div>
			<div class="md:pt-2">
				<slot />
			</div>
		</div>
	</div>
</div>
