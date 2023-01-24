<script>

  export let data;

//	console.log('data', data);

//  let { lookup_item } = data;
//  $: ({ lookup_item } = data);


//	import Main from './harga/barangan_segar/+page.svelte';

	import { onMount } from "svelte"
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';

	import * as d3 from "d3"

	let dbg=1;
	let el;


	//====================================================================================
	//
	//====================================================================================
	onMount(async () => {
		if(browser) {
			dbg&&console.group('%c'+'onMount','color:magenta');

//			L = await import('leaflet');


//			console.log('lookup_item', lookup_item);
			d3.select(el).call(init);


			const savedList = window.localStorage.getItem('savedList') || null;
			//window.localStorage.setItem('savedList', [lat,lon].join(',') );


			dbg&&console.groupEnd('onMount');
		} // browser
	}); // onMount


	//====================================================================================
	//
	//====================================================================================

	function init(sel)	{

		//console.log('data', data);
		let gp = d3.groups(data.lookup_item, d=>d.item_group);

//		console.log('gp', gp);

		sel.selectChildren('.bp4-tree').data([gp])
			.join('div').attr('class','bp4-tree bp4-elevation-0')
				.selectChildren('ul').data(d=>[d])
					.join('ul').attr('class','bp4-tree-node-list bp4-tree-root')
						.call(subtree, 'item_category')

	}



	function subtree(sel, key)	{

		sel.selectChildren('li').data(d=>d)
			.join('li').attr('class','bp4-tree-node bp4-tree-node-expanded')
				.call(sel=>{

					sel.selectChildren('div').data(d=>[d])
						.join('div').attr('class','bp4-tree-node-content')
							.call(sel=>{

								sel.selectChildren('.caret').data(d=>[d])
									.join('span').attr('class','caret bp4-tree-node-caret bp4-tree-node-caret-open bp4-icon-standard');

								sel.selectChildren('.icon').data(d=>[d])
									.join('span').attr('class','icon bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-close');

								sel.selectChildren('.label').data(d=>[d])
									.join('span').attr('class','label bp4-tree-node-label')
										.html(d=>d[0]);

								sel.selectChildren('.label2').data(d=>[d])
									.join('span').attr('class','label2 bp4-tree-node-secondary-label')
										.html(d=>d[1].length);

							});


					sel.selectChildren('ul').data(d=>{
						let k = d3.groups(d[1], d=>d[key]);
						console.log(key, k)
						return [k];
					})
						.join('ul').attr('class','bp4-tree-node-list')
							.style('margin-left','32px')
							.call(sel=>{

								if (key=='item_category')	{
									sel.call(subtree, key=='item_subcategory')
								}


							});

				});

	}


</script>


<div bind:this={el}/>




<!--
<Main/>
-->
