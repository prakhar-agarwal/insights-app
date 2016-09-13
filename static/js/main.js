
var db = new PouchDB('insights')

function openDashboard(dashboard) {

	var str = ''

	db
	.allDocs({
	  include_docs: true
	})
	.then(function (result) {
		console.log('got ' + result.rows.length + ' records')
		var flag = true
		for(var i = 0 ; i < result.rows.length ; i++) {
			console.log(result.rows[i]['doc'])
			if (result.rows[i]['doc']['dashboard'] == dashboard) {
				if (flag) {
					str += '<div class="row">'
				}

				str += '<div class="col-md-6"><div class="box box-info"><div data-attribute-title="' + result.rows[i]['doc']['title'] 
						+ '" class="box-header with-border"><h3 class="box-title">'
				str += result.rows[i]['doc']['title']
				str += '</h3></div><div class="box-body">'

				str += `<iframe src="`
				str += result.rows[i]['doc']['url']
				str += `" height="100%" width="100%" style="border:0;"></iframe>`
				
				str += '</div></div></div>'
				if (flag) {
					flag = false
				} else {
					flag = true
					str += '</div>'
				}
			}
		}

		$(".content-header").html(str)

		var tabs = $(".sidebar-menu li")
		tabs.each(function(i) {
			$(tabs[i]).removeClass('active')
			if ($(tabs[i]).attr('id') == dashboard) {
				$(tabs[i]).addClass('active')
			}
		})

		$(".box-header").on("click", function(e) {
			var title = $(e.target).attr('data-attribute-title')
			db.get(title).then(function (doc) {
				var str = '<div class="row">'

				str += '<div class="col-md-12"><div class="box box-info"><div data-attribute-title="' + doc['title'] 
						+ '" class="box-header with-border"><h3 class="box-title">'
				str += doc['title']
				str += '</h3></div><div class="box-body">'

				str += `<iframe src="`
				str += doc['url']
				var ht = $(window).height() - 250
				str += `" height="` + ht + `px" width="100%" style="border:0;"></iframe>`

				str += '</div></div></div></div>'

				$(".content-header").html(str)
			}).catch(function (err) {
			  console.log(err)
			})
		})
	})

}

function createVisualization() {

	var vizname = $("#vizname").val()
	var type_of_chart = $("#type-select").val()
	var viz_category = $("#vizcategory").val()

	if (vizname.length == 0) {
		alert("Visualization title must not be empty")
		return
	}

	switch(type_of_chart) {
	case 'pie':
		var pietype = $("#pie-type-select").val()

		var final_url = `http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=pie&indexPattern=droid-3&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:'2016-09-04T21:32:07.401Z',mode:absolute,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:`
		final_url += pietype
		final_url += `,order:desc,orderBy:'1',size:5),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!f,shareYAxis:!t),title:'`
		final_url += encodeURI(vizname)
		final_url += `',type:pie))`

		var doc = {'_id': vizname, 'dashboard':viz_category, 'title': vizname, 'url': final_url}
		db.put(doc)
		alert("Created New Visualization!")
	break

	case 'area':
	break
	}
}

function createNew() {

	var str = ''

	str += `
        <div class="row">
	        <div class="col-md-6">

				<div class="form-group">
					<label>Visualization Name</label>
					<input type="text" class="form-control" id="vizname">
				</div>

			</div>
		</div>

        <div class="row">
	        <div class="col-md-6">

				<div class="form-group">
					<label>Visualization Category</label>
					<select class="form-control" id="vizcategory">
						<option value="ecommerce">E-Commerce</option>
						<option value="transportation">Transportation</option>
					</select>
				</div>

			</div>
		</div>

        <div class="row">
	        <div class="col-md-6">

				<div class="form-group">
					<label>Type of Visualization</label>
					<select class="form-control" id="type-select">
						<option value="area">Area Chart</option>
						<option value="pie">Pie Chart</option>
					</select>
				</div>

			</div>
		</div>

		<div class="options-select">
		</div>

        <div class="row">
	        <div class="col-md-6">
				<input class="btn btn-success" type="submit" onclick="createVisualization()" value="Create Visualization" /></div>
			</div>
		</div>
	`

	$(".content-header").html(str)

	var tabs = $(".sidebar-menu li")
	tabs.each(function(i) {
		$(tabs[i]).removeClass('active')
	})

	$("#type-select").on("change", function() {
		var str = ''

		switch(this.value) {
		case 'area':
			str += ``
		break

		case 'pie':
			str += `
		        <div class="row">
			        <div class="col-md-6">

						<div class="form-group">
							<label>Split Field</label>
							<select class="form-control" id="pie-type-select">
								<option value="app_name">App Name</option>
								<option value="app_category">App Category</option>
								<option value="user_id">User ID</option>
							</select>
						</div>

					</div>
				</div>

			`

		break
		}

		$(".options-select").html(str)
	})
}

function createNewInsight() {

	var str = ''

	str += `
        <div class="row">
	        <div class="col-md-12">
	        	<h2>Process of retrieving anonymized data</h2>
			</div>
		</div>

        <div class="row">
	        <div class="col-md-12">

	        	<p>Use UI Automator Viewer</p>

			</div>
		</div>
	`

	$(".content-header").html(str)

	var tabs = $(".sidebar-menu li")
	tabs.each(function(i) {
		$(tabs[i]).removeClass('active')
	})

	$("#type-select").on("change", function() {
		var str = ''

		switch(this.value) {
		case 'area':
			str += ``
		break

		case 'pie':
			str += `
		        <div class="row">
			        <div class="col-md-6">

						<div class="form-group">
							<label>Split Field</label>
							<select class="form-control" id="pie-type-select">
								<option value="app_name">App Name</option>
								<option value="app_category">App Category</option>
								<option value="user_id">User ID</option>
							</select>
						</div>

					</div>
				</div>

			`

		break
		}

		$(".options-select").html(str)
	})
}

$(document).ready(function() {
	var height = $(window).height() - 100
	$(".content-wrapper").css('min-height', height)

	///////////////////////////
	/////	Seed Data
	///////////////////////////
	// data = {
	// '_id': 'No of Hits vs Time for Different Apps',
	// 'title': 'No of Hits vs Time for Different Apps',
	// 'dashboard': 'ecommerce',
	// 'url': "http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=line&indexPattern=ecommerce_new&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-12h,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(vis:(colors:(Amazon:%23E24D42,Flipkart:%239AC48A))),vis:(aggs:!((id:'1',params:(customLabel:'Total%20Hits'),schema:metric,type:count),(id:'2',params:(customInterval:'2h',customLabel:'Time%20(5s)',extended_bounds:(),field:startTime,interval:auto,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(field:appName,order:desc,orderBy:'1',size:5),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:9,scale:linear,setYExtents:!f,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:()),title:'New%20Visualization',type:line))"
	// }
	// db.put(data)

	data = {
		'_id': 'Location of Users',
		'title': 'Location of Users',
		'dashboard': 'ecommerce',
		'url': "http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=tile_map&indexPattern=ecommerce_new&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-7d,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(autoPrecision:!t,field:user_location,precision:2),schema:segment,type:geohash_grid)),listeners:(),params:(addTooltip:!t,heatBlur:15,heatMaxZoom:16,heatMinOpacity:0.1,heatNormalizeData:!t,heatRadius:25,isDesaturated:!t,mapType:'Scaled%20Circle%20Markers',wms:(enabled:!f,options:(attribution:'Maps%20provided%20by%20USGS',format:image%2Fpng,layers:'0',styles:'',transparent:!t,version:'1.3.0'),url:'https:%2F%2Fbasemap.nationalmap.gov%2Farcgis%2Fservices%2FUSGSTopo%2FMapServer%2FWMSServer')),title:'New%20Visualization',type:tile_map))"
	}
	db.put(data)

	data = {
		'_id': 'Gender of Users Per App',
		'title': 'Gender of Users Per App',
		'dashboard': 'ecommerce',
		'url': "http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=area&indexPattern=ecommerce_new&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-7d,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(vis:(colors:(F:%237EB26D,M:%23447EBC))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:appName,order:desc,orderBy:'1',size:5),schema:segment,type:terms),(id:'3',params:(field:user_gender,order:desc,orderBy:'1',size:5),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,interpolate:linear,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,smoothLines:!f,times:!(),yAxis:()),title:'New%20Visualization',type:area))"
	}
	db.put(data)

	data = {
		'_id': 'Age of Users Per App',
		'title': 'Age of Users Per App',
		'dashboard': 'ecommerce',
		'url': "http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=histogram&indexPattern=ecommerce_new&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-7d,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:appName,order:desc,orderBy:'1',size:5),schema:segment,type:terms),(id:'3',params:(field:user_age,order:desc,orderBy:'1',size:5),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),title:'New%20Visualization',type:histogram))"
	}
	db.put(data)


	// data = {
	// 	'_id': 'Quartile Deviations of Price',
	// 	'title': 'Quartile Deviations of Price',
	// 	'dashboard': 'ecommerce',
	// 	'url': "http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=table&indexPattern=ecommerce_new&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-12h,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(),vis:(aggs:!((id:'1',params:(field:item_price,percents:!(25,50,75)),schema:metric,type:percentiles),(id:'2',params:(field:appName,order:desc,orderBy:'1.50',size:5),schema:bucket,type:terms)),listeners:(),params:(perPage:10,showMeticsAtAllLevels:!f,showPartialRows:!f),title:'New%20Visualization',type:table))"
	// }
	// db.put(data)


	data = {
		'_id': 'Cabs Booked Ola vs Uber',
		'title': 'Cabs Booked Ola vs Uber',
		'dashboard': 'transportation',
		'url': "http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=line&indexPattern=transport_new&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-14h,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(vis:(colors:(Uber:%239AC48A))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:startTime,interval:auto,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(field:appName,order:desc,orderBy:'1',row:!t,size:5),schema:split,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:9,scale:linear,setYExtents:!f,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:()),title:'New%20Visualization',type:line))"
	}
	db.put(data)

	data = {
		'_id': 'Male/Female Usage Ola vs Uber',
		'title': 'Male/Female Usage Ola vs Uber',
		'dashboard': 'transportation',
		'url': "http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=area&indexPattern=transport_new&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-12h,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:appName,order:desc,orderBy:'1',size:5),schema:segment,type:terms),(id:'3',params:(field:user_gender,order:desc,orderBy:'1',size:5),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,interpolate:linear,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,smoothLines:!f,times:!(),yAxis:()),title:'New%20Visualization',type:area))"
	}
	db.put(data)

	data = {
		'_id': 'Age Distribution of Users Ola vs Uber',
		'title': 'Age Distribution of Users Ola vs Uber',
		'dashboard': 'transportation',
		'url': "http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=histogram&indexPattern=transport_new&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-12h,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(vis:(colors:(F:%237EB26D))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:appName,order:desc,orderBy:'1',size:5),schema:segment,type:terms),(id:'3',params:(field:user_age,order:desc,orderBy:'1',size:5),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),title:'New%20Visualization',type:histogram))"
	}
	db.put(data)

	data = {
		'_id':'Realtime Quartile Deviation of Price',
		'title': 'Realtime Quartile Deviation of Price',
		'dashboard':'ecommerce',
		'url': "http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=table&indexPattern=realtime&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-7d,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(),vis:(aggs:!((id:'1',params:(field:params_price,percents:!(25,50,75)),schema:metric,type:percentiles),(id:'2',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:Flipkart))),label:''),(input:(query:(query_string:(analyze_wildcard:!t,query:Snapdeal)))),(input:(query:(query_string:(analyze_wildcard:!t,query:Amazon)))))),schema:bucket,type:filters)),listeners:(),params:(perPage:10,showMeticsAtAllLevels:!f,showPartialRows:!f),title:'New%20Visualization',type:table))"
	}
	db.put(data)

	data = {
		'_id':'Realtime Number of Hits per App',
		'title':'Realtime Number of Hits per App',
		'dashboard':'ecommerce',
		'url':"http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=line&indexPattern=realtime&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-7d,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(vis:(colors:(Amazon:%23E24D42,Snapdeal:%239AC48A))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:startTime,interval:auto,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:Flipkart))),label:''),(input:(query:(query_string:(analyze_wildcard:!t,query:Snapdeal)))),(input:(query:(query_string:(analyze_wildcard:!t,query:Amazon)))))),schema:group,type:filters)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:9,scale:linear,setYExtents:!f,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:()),title:'New%20Visualization',type:line))"
	}
	db.put(data)


	data={
		'_id':'Realtime Gender vs Purchase per app',
		'title':'Realtime Gender vs Purchase per app',
		'dashboard':'ecommerce',
		'url':"http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=histogram&indexPattern=realtime&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-7d,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(vis:(colors:(Female:%230A50A1,Male:%23BF1B00))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:Flipkart))),label:''),(input:(query:(query_string:(analyze_wildcard:!t,query:Amazon)))),(input:(query:(query_string:(analyze_wildcard:!t,query:Snapdeal)))))),schema:segment,type:filters),(id:'3',params:(field:user_gender,order:desc,orderBy:'1',size:5),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,mode:grouped,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),title:'New%20Visualization',type:histogram))"
	}
	db.put(data)

	data={
		'_id':'Realtime Cabs Booked Ola vs Uber',
		'title':'Realtime Cabs Booked Ola vs Uber',
		'dashboard':'transportation',
		'url':"http://insights.dev:5601/app/kibana#/visualize/create?embed=true&type=line&indexPattern=realtime&_g=(refreshInterval:(display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-7d,mode:absolute,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'*')),uiState:(vis:(colors:(Ola:%239AC48A,Uber:%23BF1B00))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:startTime,interval:auto,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:Uber))),label:''),(input:(query:(query_string:(analyze_wildcard:!t,query:Ola)))))),schema:group,type:filters)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:9,scale:linear,setYExtents:!f,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:()),title:'New%20Visualization',type:line))"
	}
	db.put(data)






	// Open Visualization
	if ($(this).attr('title') != 'New Visualization') {
		openDashboard('ecommerce')
	}
})
