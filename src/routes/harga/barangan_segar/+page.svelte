<svelte:head>
	<title>harga barangan segar</title>
	<meta name="description" content="harga barangan segar" />
</svelte:head>

<script>
	import Header from '../../Header.svelte';
</script>

<style>

	iframe {
		width:100%;
		min-height:700px;
		border:none;
		margin-top:32px;
		background:#fff;
	}

</style>

<Header />

<iframe title="dashboard" src="https://harga.kb.asia-southeast1.gcp.elastic-cloud.com:9243/app/dashboards?auth_provider_hint=anonymous1#/view/4bc68bf0-9ad8-11ed-a0f6-bfe9bbfa0f66?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3A'2021-12-31T16%3A00%3A00.000Z'%2Cto%3Anow))&hide-filter-bar=true" height="7000px" width="100%"></iframe>
