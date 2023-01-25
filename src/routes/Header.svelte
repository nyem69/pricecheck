
<script>
	import { page } from '$app/stores';
</script>


<div class="flex">

	<a href="/harga/barangan_segar" class="bp4-button bp4-icon-grouped-bar-chart bp4-large { ($page.url.pathname==='/harga/barangan_segar'|| $page.url.pathname==='/') ? 'bp4-intent-primary' : ''}" tabindex="0" role="button">Harga Purata / Terkini Barangan Segar</a>
	<a href="/harga/peringkat" class="bp4-button bp4-icon-regression-chart bp4-large {$page.url.pathname === '/harga/peringkat' ? 'bp4-intent-primary' : ''}" tabindex="0" role="button">Perbandingan Harga Mengikut Peringkat / Premis</a>

</div>


<div class="flex">
	<div>
		Sumber data : PriceCatcher KPDN melalui <a href="https://open.dosm.gov.my/" _target="_blank">Open DOSM</a>
	</div>
</div>



<style>
	.flex {
		display:flex;
		justify-content: center;
		align-items: center;
		flex-wrap:wrap;
		margin:12px;
	}
</style>
