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

	let el_selection;


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
//
//	function init(sel)	{
//
//		//console.log('data', data);
//		let gp = d3.groups(data.lookup_item, d=>d.item_group);
//
////		console.log('gp', gp);
//
//		sel.selectChildren('.bp4-tree').data([gp])
//			.join('div').attr('class','bp4-tree bp4-elevation-0')
//				.selectChildren('ul').data(d=>[d])
//					.join('ul').attr('class','bp4-tree-node-list bp4-tree-root')
//						.call(subtree, 'item_category')
//
//	}
//
//
//
//
//	//====================================================================================
//	//
//	//====================================================================================
//	function subtree(sel, key)	{
//
//		dbg&&console.group('%c'+'subtree-'+key, 'color:magenta');
//		dbg&&console.log('key', key);
//
//		sel.selectChildren('li').data(d=>d)
//			.join('li').attr('class','bp4-tree-node bp4-tree-node-expanded')
//				.call(sel=>{
//
//					sel.selectChildren('div').data(d=>[d])
//						.join('div').attr('class','bp4-tree-node-content')
//							.call(sel=>{
//
//								sel.selectChildren('.caret').data(d=>[d])
//									.join('span').attr('class','caret bp4-tree-node-caret bp4-tree-node-caret-open bp4-icon-standard');
//
//								sel.selectChildren('.icon').data(d=>[d])
//									.join('span').attr('class','icon bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-close');
//
//								sel.selectChildren('.label').data(d=>[d])
//									.join('span').attr('class','label bp4-tree-node-label')
//										.html(d=>d[0]);
//
//								sel.selectChildren('.label2').data(d=>[d])
//									.join('span').attr('class','label2 bp4-tree-node-secondary-label')
//										.html(d=>d[1].length);
//
//							});
//
//
//					sel.selectChildren('ul').data(d=>{
//						if (key=='item_category')	{
//							let k = d3.groups(d[1], d=>d[key]);
//							console.log(key, k)
//							return [k];
//						}else if (key=='item_subcategory')	{
//							let k = d3.groups(d[1], d=>d[key]);
//							console.log(key, k)
//							return [k];
//						}else	{
//							return []
//						}
//					})
//						.join('ul').attr('class','bp4-tree-node-list')
//							.style('margin-left','32px')
//							.call(sel=>{
//
//								if (key=='item_category')	{
//									sel.call(subtree, 'item_subcategory')
//								}else	{
//									//sel.call(subtree, 'item')
//								}
//
//
//							});
//
//				});
//
//		dbg&&console.groupEnd('subtree-'+key);
//
//	}


	//====================================================================================
	//
	//====================================================================================

	let menuList = d3.groups(data.lookup_item, d=>d.item_group)
							.map(d=>{

								return {
									key			: d[0].replace(/\W+/g,'').trim().toLowerCase(),
									label		: d[0],
									total		: d[1].length,
									values	: d3.groups(d[1], d=>d['item_category'])
															.map(d=>{

																return {
																	key			: d[0].replace(/\W+/g,'').trim().toLowerCase(),
																	label		: d[0],
																	total		: d[1].length,
																	values	: d3.groups(d[1], d=>d['item_subcategory']||d['item_category'])
																							.map(d=>{

																								return {
																									key			: d[0].replace(/\W+/g,'').trim().toLowerCase(),
																									label		: d[0],
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

		console.log('className', sel.node().className);

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


		let sel 			= d3.select(this),
				nodeIcon 	= sel.select('.node-icon '),
				active 		= !nodeIcon.classed('bp4-icon-tick-circle');

		console.log('sel', sel.node());
		console.log('sel', sel.node().className);
		console.log('active', active);

		nodeIcon
			.classed('bp4-icon-add', !active)
			.classed('bp4-icon-tick-circle', active)
			.style('color', active?'white':null)

		sel.style('background', active?'#2867cc':null)
				.style('color', active?'white':null)

		console.log('nodeIcon', nodeIcon.node());


		let item_code = sel.node().className.split(/\s+/)
				.filter(d=>d.match(/^item_code-\d+/))
				.map(d=>+(d.match(/^item_code-(\d+)$/)[1]));

		console.log('item_code',item_code, data.lookup_item.find(d=>+d.item_code==item_code[0]) );


		data.lookup_item
			.filter(d=>+d.item_code==item_code[0])
			.forEach(d=>{
				d._selected = active;
			});

		selectionList();

		console.groupEnd('toggleItem')
	}




	//====================================================================================
	//
	//====================================================================================

	function selectionList()	{

		d3.select(el_selection)
			.style('font-family','Fira Mono')
			.call(sel=>{

				sel.selectChildren('.header').data(d=>[d])
					.join('div').attr('class','header')
						.style('border-bottom','1px hashed #000')
						.style('margin-top','50px')
						.call(sel=>{

							sel.selectChildren('.title').data(d=>[d])
								.join('div').attr('class','title')
									.html('Senarai Pilihan')


							sel.selectChildren('hr').data(d=>[d])
								.join('hr')
									.attr('size','2px')
									.style('border-top','1px dashed #999')



						});


				sel.selectChildren('.senarai').data(d=>[d])
					.join('div').attr('class','senarai')
						.call(sel=>{



							sel.selectChildren('.item').data(

								data.lookup_item.filter(d=>d._selected)
									.sort(d3comparator().order(d3.ascending, d=>d.item))

							, d=>d.item_code)
								.join('div').attr('class','item')
									.style('display','flex')
									.style('margin-top','12px')
									.style('margin-bottom','12px')
									.call(sel=>{



										sel.selectChildren('.icon').data(d=>[d])
											.join('div').attr('class','icon')
												.style('flex','1 1 32px')
												.style('max-width','32px')
												.selectChildren('button').data(d=>[d])
													.join('button')
														.attr('class','bp4-button bp4-icon-delete bp4-small bp4-minimal')


										sel.selectChildren('.name').data(d=>[d])
											.join('div').attr('class','name')
												.style('flex','1 1 300px')
												.style('max-width','300px')
												.html(d=>d.item)

										sel.selectChildren('.unit').data(d=>[d])
											.join('div').attr('class','unit')
												.style('flex','1 1 100px')
												.style('max-width','100px')
												.html(d=>d.unit)

									});




						});



				sel.selectChildren('.footer').data(d=>[d])
					.join('div').attr('class','footer')
						.style('border-bottom','1px hashed #000')
						.call(sel=>{


							sel.selectChildren('hr').data(d=>[d])
								.join('hr')
									.attr('size','2px')
									.style('border-top','1px dashed #999')

							sel.selectChildren('.title').data(d=>[d])
								.join('div').attr('class','title')
									.html('Harga Purata Keseluruhan')



						});



			});


	}


</script>

<style>

	.flex {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	.flexItem {
		flex: 1 1 400px;
		margin:12px;
	}

</style>


<div class="flex">

	<div class="flexItem">

		<div class="bp4-tree bp4-elevation-3" style="padding-top:50px;padding-bottom:50px;background:#FBF6A740">

			<div style="margin:24px;">
				Pilih barangan
			</div>

		  <ul class="bp4-tree-node-list bp4-tree-root">

		  	{#each menuList as item_group}

			    <li class="bp4-tree-node">

						<!--
			      	on:click={(e,d) => toggleTree(e,d)}
			      -->

			      <div class="bp4-tree-node-content item_group item_group-{item_group.key}"
			      	on:click={toggleTree}
			      	style="cursor:pointer"
			      >
			        <span class="caret bp4-tree-node-caret bp4-tree-node-caret-open bp4-icon-standard"></span>
			        <span class="bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-close"></span>
			        <span class="bp4-tree-node-label">{item_group.label}</span>
			        <span class="bp4-tree-node-secondary-label">{item_group.total}</span>
			      </div>

			      <ul class="bp4-tree-node-list" style="margin-left:24px; display:none">

			      	{#each item_group.values as item_category}

				        <li class="bp4-tree-node">
				          <div class="bp4-tree-node-content item_category item_category-{item_category.key}" on:click={toggleTree} style="cursor:pointer">
				            <span class="caret bp4-tree-node-caret bp4-icon-standard"></span>
				            <span class="bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-close"></span>
				          	<span class="bp4-tree-node-label">{item_category.label}</span>
				          	<span class="bp4-tree-node-secondary-label">{item_category.total}</span>
				          </div>


						      <ul class="bp4-tree-node-list" style="margin-left:24px; display:none">

						      	{#each item_category.values as item_subcategory}

							        <li class="bp4-tree-node">
							          <div class="bp4-tree-node-content item_subcategory item_subcategory-{item_subcategory.key}" on:click={toggleTree} style="cursor:pointer">
							            <span class="caret bp4-tree-node-caret bp4-icon-standard"></span>
							            <span class="bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-close"></span>
							          	<span class="bp4-tree-node-label">{item_subcategory.label}</span>
							          	<span class="bp4-tree-node-secondary-label">{item_subcategory.total}</span>
							          </div>


							          <ul class="bp4-tree-node-list" style="margin-left:24px; display:none">

									      	{#each item_subcategory.values as item}

										        <li class="bp4-tree-node">
										          <div class="item bp4-tree-node-content item_code item_code-{item.item_code}" on:click={toggleItem} style="cursor:pointer">
										            <span class="bp4-tree-node-caret-none bp4-icon-standard"></span>
										            <span class="node-icon bp4-tree-node-icon bp4-icon-standard bp4-icon-add"></span>
										          	<span class="bp4-tree-node-label" style="max-width:350px">{item.item}</span>
										          	<span class="bp4-tree-node-secondary-label">{item.unit}</span>
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

	</div>


	<div class="flexItem">

		<div class="bp4-card bp4-elevation-2" style="padding-top:50px;padding-bottom:50px;background:#F8B39B40;" bind:this={el_selection}/>

	</div>

</div>







<!--
<Main/>
-->
