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
	import d3comparator from '$lib/d3comparator.js';

	let dbg=1;
	let el;


	//====================================================================================
	//
	//====================================================================================
	onMount(async () => {
		if(browser) {
			dbg&&console.group('%c'+'onMount','color:magenta');

//			L = await import('leaflet');

//				d3.select(el).call(init);

//			console.log('lookup_item', lookup_item);


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




	//====================================================================================
	//
	//====================================================================================
	function subtree(sel, key)	{

		dbg&&console.group('%c'+'subtree-'+key, 'color:magenta');
		dbg&&console.log('key', key);

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
						if (key=='item_category')	{
							let k = d3.groups(d[1], d=>d[key]);
							console.log(key, k)
							return [k];
						}else if (key=='item_subcategory')	{
							let k = d3.groups(d[1], d=>d[key]);
							console.log(key, k)
							return [k];
						}else	{
							return []
						}
					})
						.join('ul').attr('class','bp4-tree-node-list')
							.style('margin-left','32px')
							.call(sel=>{

								if (key=='item_category')	{
									sel.call(subtree, 'item_subcategory')
								}else	{
									//sel.call(subtree, 'item')
								}


							});

				});

		dbg&&console.groupEnd('subtree-'+key);

	}


	//====================================================================================
	//
	//====================================================================================

	let menuList = d3.groups(data.lookup_item, d=>d.item_group)
							.map(d=>{

								return {
									key			: d[0],
									total		: d[1].length,
									values	: d3.groups(d[1], d=>d['item_category'])
															.map(d=>{

																return {
																	key			: d[0],
																	total		: d[1].length,
																	values	: d3.groups(d[1], d=>d['item_subcategory']||d['item_category'])
																							.map(d=>{

																								return {
																									key			: d[0],
																									total		: d[1].length,
																									values	: d[1].sort(d3comparator().order(d3.ascending, d=>d['item']))
																								}

																							})
																							.sort(d3comparator().order(d3.ascending, d=>d.key))
																}

															})
															.sort(d3comparator().order(d3.ascending, d=>d.key))

								}


							})
							.sort(d3comparator().order(d3.ascending, d=>d.key))

	console.log('menuList', menuList);


	//====================================================================================
	//
	//====================================================================================

	function toggleTree()	{
		console.group('%c'+'toggleTree','color:lime')
		console.log(this);

		let sel = d3.select(this),
				parent = d3.select(this.parentNode),
				expanded = !parent.classed('bp4-tree-node-expanded');

		console.log('parent', parent.node());
		console.log('expanded', expanded);

		parent.classed('bp4-tree-node-expanded', expanded);
		parent.select('.bp4-tree-node-list').style('display', expanded?null:'none');

		sel.select('.caret')
			.classed('bp4-tree-node-caret-open', expanded)
//			.classed('bp4-icon-folder-open', expanded)

		sel.select('.bp4-tree-node-icon')
			.classed('bp4-icon-folder-close', !expanded)
			.classed('bp4-icon-folder-open', expanded)

		console.groupEnd('toggleTree')
	}



	//====================================================================================
	//
	//====================================================================================
	function toggleItem()	{
		console.group('%c'+'toggleItem','color:lime')
		console.log(this);

		let sel 		= d3.select(this),
				active 	= !sel.classed('bp4-icon-tick-circle');

		console.log('sel', sel.node());
		console.log('active', active);

		let nodeIcon = sel.select('.node-icon ')
			//.classed('bp4-active', active)
			.classed('bp4-icon-add', !active)
			.classed('bp4-icon-tick-circle', active)

		console.log('nodeIcon', nodeIcon.node());

		console.groupEnd('toggleItem')
	}

</script>


<div class="bp4-tree bp4-elevation-0">
  <ul class="bp4-tree-node-list bp4-tree-root">

  	{#each menuList as item_group}

	    <li class="bp4-tree-node">

				<!--
	      	on:click={(e,d) => toggleTree(e,d)}
	      -->

	      <div class="bp4-tree-node-content"
	      	on:click={toggleTree}
	      	style="cursor:pointer"
	      >
	        <span class="caret bp4-tree-node-caret bp4-tree-node-caret-open bp4-icon-standard"></span>
	        <span class="bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-close"></span>
	        <span class="bp4-tree-node-label">{item_group.key}</span>
	        <span class="bp4-tree-node-secondary-label">{item_group.total}</span>
	      </div>

	      <ul class="bp4-tree-node-list" style="margin-left:24px; display:none">

	      	{#each item_group.values as item_category}

		        <li class="bp4-tree-node">
		          <div class="bp4-tree-node-content" on:click={toggleTree} style="cursor:pointer">
		            <span class="caret bp4-tree-node-caret bp4-icon-standard"></span>
		            <span class="bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-close"></span>
		          	<span class="bp4-tree-node-label">{item_category.key}</span>
		          	<span class="bp4-tree-node-secondary-label">{item_category.total}</span>
		          </div>


				      <ul class="bp4-tree-node-list" style="margin-left:24px; display:none">

				      	{#each item_category.values as item_subcategory}

					        <li class="bp4-tree-node">
					          <div class="bp4-tree-node-content" on:click={toggleTree} style="cursor:pointer">
					            <span class="caret bp4-tree-node-caret bp4-icon-standard"></span>
					            <span class="bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-close"></span>
					          	<span class="bp4-tree-node-label">{item_subcategory.key}</span>
					          	<span class="bp4-tree-node-secondary-label">{item_subcategory.total}</span>
					          </div>


					          <ul class="bp4-tree-node-list" style="margin-left:24px; display:none">

							      	{#each item_subcategory.values as item}

								        <li class="bp4-tree-node">
								          <div class="item bp4-tree-node-content" on:click={toggleItem} style="cursor:pointer">
								            <span class="bp4-tree-node-caret-none bp4-icon-standard"></span>
								            <span class="node-icon bp4-tree-node-icon bp4-icon-standard bp4-icon-add"></span>
								          	<span class="bp4-tree-node-label">{item.item}</span>
								          </div>

											{/each}

										</ul>
									</li>

								{/each}

							</ul>
		        </li>

	        {/each}

	      </ul>
	    </li>

		{/each}

  </ul>
</div>



<div bind:this={el}/>




<!--
<Main/>
-->
