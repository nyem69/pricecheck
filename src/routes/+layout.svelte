<script>
  /** @type {import('./$types').LayoutData} */
  export let data;
  let { lookup_item } = data;
  $: ({ lookup_item } = data);

	import Header from './Header.svelte';
	import './styles.css';

</script>


<div class="app">
	<Header />

	<main>
	  <!-- +page.svelte is rendered in this <slot> -->
		<slot />
	</main>



	<footer>

		<ul>
		  {#each lookup_item as item}
		    <li>{item.item}</li>
		  {/each}
		</ul>

		<div>
			<p>visit <a href="https://open.dosm.gov.my">open.dosm.gov.my</a> for more data</p>
		</div>

	</footer>
</div>
