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


	import { PUBLIC_ELASTICSEARCH_URL, PUBLIC_ELASTICSEARCH_USER, PUBLIC_ELASTICSEARCH_PWD } from '$env/static/public';



	let dbg=1;

	let el_selection;
	let innerwidth;



	//====================================================================================
	//
	//====================================================================================

	let windowWidth;

	const debounce = (func, delay) => {
		let timer;

		return function () {
			const context = this;
			const args = arguments;
			clearTimeout(timer);
			timer = setTimeout(() => func.apply(context, args), delay);
		};
	};

	const setWindowWidth = () => {
		windowWidth = `${window.innerWidth}px`;

		d3.selectAll('.flexItem')
			.style('max-width', innerWidth+'px')

		d3.selectAll('.node-label')
			.style('max-width', (innerWidth - ((24+24)*3) - 200)+'px')

	};

	const debouncedSetWindowWidth = debounce(setWindowWidth, 300);


	//====================================================================================
	//
	//====================================================================================
	onMount(async () => {

//		window.addEventListener('resize', debouncedSetWindowWidth);
//
//		return () => {
//			window.removeEventListener('resize', debouncedSetWindowWidth);
//		}
//


		if(browser) {
			dbg&&console.group('%c'+'onMount','color:magenta');

//			L = await import('leaflet');

//				d3.select(el).call(init);

//			console.log('lookup_item', lookup_item);

			innerwidth = innerWidth;

//			d3.selectAll('.flexItem')
//				.style('max-width', innerWidth+'px')
//
//			d3.selectAll('.node-label')
//				.style('max-width', (innerWidth - ((24+24)*3) - 100)+'px')



			d3.selectAll('.node-content')
				.style('height','auto')
				.style('margin-bottom','12px')



			const savedList = window.localStorage.getItem('savedList') || null;
			//window.localStorage.setItem('savedList', [lat,lon].join(',') );


			selectionList();


			dbg&&console.groupEnd('onMount');
		} // browser
	}); // onMount


	//====================================================================================
	//
	//====================================================================================

	function menuTree()	{
		console.group('%c'+'menuTree','color:magenta')

		console.log('data', data);


		let k = d3.groups(data.lookup_item, d=>d.item_group)
							.map(d=>{

								return {
									key				: d[0].replace(/\W+/g,'').trim().toLowerCase(),
									label			: d[0],
									total			: d[1].length,
									selected	: d[1].filter(d=>d._selected).length,
									values		: d3.groups(d[1], d=>d['item_category'])
															.map(d=>{

																return {
																	key				: d[0].replace(/\W+/g,'').trim().toLowerCase(),
																	label			: d[0],
																	total			: d[1].length,
																	selected	: d[1].filter(d=>d._selected).length,
																	values		: d3.groups(d[1], d=>d['item_subcategory']||d['item_category'])
																							.map(d=>{

																								return {
																									key				: d[0].replace(/\W+/g,'').trim().toLowerCase(),
																									label			: d[0],
																									total			: d[1].length,
																									selected	: d[1].filter(d=>d._selected).length,
																									values		: d[1].sort(d3comparator().order(d3.ascending, d=>d['item']))
																								}

																							})
																							.sort(d3comparator().order(d3.ascending, d=>d.key))
																}

															})
															.sort(d3comparator().order(d3.ascending, d=>d.key))

								}


							})
							.sort(d3comparator().order(d3.ascending, d=>d.key));


		console.groupEnd('menuTree');

		return k;
	}

	let menuList = menuTree();
	console.log('menuList', menuList);


	//====================================================================================
	//
	//====================================================================================

	function init(sel)	{


	}


	//====================================================================================
	//
	//====================================================================================

	function toggleTree()	{
		console.group('%c'+'toggleTree','color:lime')
		console.log(this);

		let sel = d3.select(this),
				parent = d3.select(this.parentNode),
				expanded = !parent.classed('bp4-tree-node-expanded');

		parent.classed('bp4-tree-node-expanded', expanded);
		parent.select('.bp4-tree-node-list').style('display', expanded?null:'none');

		sel.select('.caret')
			.classed('bp4-tree-node-caret-open', expanded)

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

		nodeIcon
			.classed('bp4-icon-add', !active)
			.classed('bp4-icon-tick-circle', active)
			.style('color', active?'red':null)

		sel.style('background', active?'#F8B39B40':null)
				.style('color', active?'blue':null)


		let item_code = sel.node().className.split(/\s+/)
				.filter(d=>d.match(/^item_code-\d+/))
				.map(d=>+(d.match(/^item_code-(\d+)$/)[1]));


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

//				sel.selectChildren('.header').data(d=>[d])
//					.join('div').attr('class','header')
//						.style('border-bottom','1px hashed #000')
//						.style('margin-top','50px')
//						.call(sel=>{
//
//							sel.selectChildren('.title').data(d=>[d])
//								.join('div').attr('class','title')
//									.html('Senarai Pilihan')
//
//
//							sel.selectChildren('hr').data(d=>[d])
//								.join('hr')
//									.attr('size','2px')
//									.style('border-top','1px dashed #999')
//
//
//
//						});


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
														.on('click', function(e,d){
															console.log('d',d);
															d._selected = false;
															selectionList();
														});


										sel.selectChildren('.name').data(d=>[d])
											.join('div').attr('class','name')
												.style('flex','1 1 300px')
												.style('max-width','300px')
												.html(d=>d.item)

										sel.selectChildren('.unit').data(d=>[d])
											.join('div').attr('class','unit')
												.style('flex','1 1 100px')
												.style('max-width','100px')
												.style('text-align','end')
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




	//====================================================================================
	//
	//====================================================================================

	function selectionSync()	{

		menuList = menuTree();

		d3.select()

	}


	//====================================================================================
	//
	//====================================================================================

	function getPrices()	{

		let dsl = {
			size:0,
			aggs:{
				AGG:{
					avg:{
						field:'price'
					}
				}
			}
		};


		let url = PUBLIC_ELASTICSEARCH_URL+"/pricechart/_search";
		let auth = "Basic " + btoa(PUBLIC_ELASTICSEARCH_USER + ":" + PUBLIC_ELASTICSEARCH_PWD);

		console.log('auth', auth);

		console.log('dsl', JSON.stringify(dsl));

		d3.json(url, {
			method: 'POST',
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Authorization": auth,
			},
			body:JSON.stringify(dsl)
		})
		.then(res=>{

			console.log('res', res);

		});

	}


//	getPrices();


	//====================================================================================
	//
	//====================================================================================

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
		margin-top:12px;
		margin-bottom:12px;
		margin-left:6px;
		margin-right:6px;
	}

</style>


<div class="flex" style="margin:6px;">

	<div class="flexItem">

		<div class="bp4-tree bp4-elevation-2" style="padding-top:50px;padding-bottom:50px;background:#FBF6A740">

			<div class="header" style="margin-top: 50px; margin-left:24px; margin-right: 24px;">

				<div style="display:flex;">
					<div style="flex:1 1 30px;"><span class="bp4-icon-standard bp4-icon-box"></span></div>
					<div style="flex:1 1 70%; text-align:left">Senarai Barangan</div>
					<div style="flex:1 1 30%; text-align:right"></div>
				</div>

				<hr size="2px" style="border-top: 1px dashed rgb(153, 153, 153);">
			</div>


		  <ul class="bp4-tree-node-list bp4-tree-root" style="margin-left:24px; margin-right: 24px;">

		  	{#each menuList as item_group}

			    <li class="bp4-tree-node">

						<!--
			      	on:click={(e,d) => toggleTree(e,d)}
			      -->

			      <div class="bp4-tree-node-content item_group item_group-{item_group.key}"
			      	on:click={toggleTree}
			      	style="cursor:pointer;display:flex"
			      >
			        <div style="flex:0 0 32px"><span class="caret bp4-tree-node-caret bp4-icon-standard"></span></div>
			        <div style="flex:0 0 24px"><span class="bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-close"></span></div>
			        <div style="flex:1 1 auto; display:flex;">
				        <span class="bp4-tree-node-label">{item_group.label}</span>
				        <span class="bp4-tree-node-secondary-label" style="flex:1 1 auto; text-align:right; color:{item_group.selected?'red':null}">{item_group.selected||''}</span>
				      </div>
			      </div>

			      <ul class="bp4-tree-node-list" style="margin-left:24px; display:none">

			      	{#each item_group.values as item_category}

				        <li class="bp4-tree-node">
				          <div class="bp4-tree-node-content item_category item_category-{item_category.key}" on:click={toggleTree} style="cursor:pointer;display:flex">
				            <div style="flex:0 0 32px"><span class="caret bp4-tree-node-caret bp4-icon-standard"></span></div>
				            <div style="flex:0 0 24px"><span class="bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-close"></span></div>
				            <div style="flex:1 1 auto; display:flex;">
					          	<span class="bp4-tree-node-label">{item_category.label}</span>
					          	<span class="bp4-tree-node-secondary-label" style="flex:1 1 auto; text-align:right; color:{item_category.selected?'red':null}">{item_category.selected||''}</span>
					          </div>
				          </div>


						      <ul class="bp4-tree-node-list" style="margin-left:24px; display:none">

						      	{#each item_category.values as item_subcategory}

							        <li class="bp4-tree-node">
							          <div class="bp4-tree-node-content item_subcategory item_subcategory-{item_subcategory.key}" on:click={toggleTree} style="cursor:pointer;display:flex">
							            <div style="flex:0 0 32px"><span class="caret bp4-tree-node-caret bp4-icon-standard"></span></div>
							            <div style="flex:0 0 24px"><span class="bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-close"></span></div>
							            <div style="flex:1 1 auto; display:flex;">
								          	<div class="bp4-tree-node-label" style="flex:1 1 auto" >{item_subcategory.label}</div>
								          	<div class="bp4-tree-node-secondary-label" style="flex:1 1 auto; text-align:right; color:{item_subcategory.selected?'red':null}">{item_subcategory.selected||''}</div>
								          </div>
							          </div>


							          <ul class="bp4-tree-node-list" style="margin-left:24px; display:none">

									      	{#each item_subcategory.values as item}

										        <li class="bp4-tree-node">
										          <div class="item node-content bp4-tree-node-content item_code item_code-{item.item_code}" on:click={toggleItem} style="cursor:pointer">
										            <span class="bp4-tree-node-caret-none bp4-icon-standard"></span>
										            <span class="node-icon bp4-tree-node-icon bp4-icon-standard bp4-icon-add" style="color:blue"></span>
										          	<span class="node-label" style="white-space: wrap; line-height:.9rem;">{item.item}</span>
										          	<span class="bp4-tree-node-secondary-label" style="min-width:70px; text-align:right;">{item.unit}</span>
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

		<div class="bp4-card bp4-elevation-2" style="padding-top:50px;padding-bottom:50px;background:#F8B39B40;" bind:this={el_selection}>

			<div class="header" style="margin-top: 50px;">

				<div style="display:flex;">
					<div style="flex:1 1 30px;"><span class="bp4-icon-standard bp4-icon-shopping-cart"></span></div>
					<div style="flex:1 1 70%; text-align:left">Senarai Pilihan</div>
					<div style="flex:1 1 30%; text-align:right"></div>
				</div>

				<hr size="2px" style="border-top: 1px dashed rgb(153, 153, 153);">
			</div>


		</div>

	</div>

</div>







<!--
<Main/>
-->
