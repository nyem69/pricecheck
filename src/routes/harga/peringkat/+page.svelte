<svelte:head>
	<title>statistik harga</title>
	<meta name="description" content="statistik harga" />
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

<!--
<iframe title="dashboard" src="https://harga.kb.asia-southeast1.gcp.elastic-cloud.com:9243/app/dashboards?auth_provider_hint=anonymous1#/view/a52fa4c0-9a69-11ed-a0f6-bfe9bbfa0f66?embed=true&_g=!n&hide-filter-bar=false" width="100%" height="7000px">></iframe>
-->
<iframe title="dashboard" src="https://harga.kb.asia-southeast1.gcp.elastic-cloud.com:9243/app/dashboards?auth_provider_hint=anonymous1#/view/a52fa4c0-9a69-11ed-a0f6-bfe9bbfa0f66?embed=true&_g=!n&show-query-input=true" width="100%" height="7000px"></iframe>
