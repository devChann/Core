// map layout
'use strict';


var attribution = 'Map data: <a href="http://openstreetmap.org">OSM</a>', metadata, rmax = 30,

    map = L.map('map').setView([-1.17315747054207, 36.7634069650127], 5);

L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', { foo: 'bar' }).addTo(map);

var rowChart = new dc.RowChart("#test");

var PieChart = new dc.PieChart("#test2");
var dataTable = new dc.DataTable('.dc-data-table');
const nasdaqCount = new dc.DataCount('.dc-data-count');
const produceChart = new dc.RowChart('#day-of-week-chart');
const bubbleChart = new dc.BubbleChart("#dc-bubble-graph");

d3.json("./wwwwroot/Assets/tempData.json").then(data => {
    
    //var jsonData = data.features.map(x => {
    //    return x.properties.Txns
    //});
    //console.log(jsonData);
    var goJson = JSON.parse(data);
    console.log(goJson)


    var ndx1 = crossfilter(data);
    var all = ndx1.groupAll();
    var geom = ndx1.dimension(function(d) {
        return d.geometry
    });

})

//var jsonFile = dataArray.features.map(x => { return x.properties.Txns });
//console.log(dataArray);
//d3.json("/Home/getFarmersProfile").then(data => {
    
//    console.log(data);
//    //var jsondata = json.features.map(function (txns) {
//    //    return txns.properties.Txns
//    //});
//    var geojson = data;
//    console.log(geojson);
//    metadata = geojson.properties;
//    var filter = crossfilter(geojson.features);
//    var filterAll = filter.groupAll();
//    var dataArray = jsondata.flat();
//    console.log(dataArray);
//    var ndx = crossfilter(dataArray);

//    // build clusters
//    var geomDimension = filter.dimension(d => { return d.geometry })
//    var markers = L.geoJson(geomDimension.top(Infinity), {
//        pointToLayer: defineFeature,
//        onEachFeature: defineFeaturePopup
//    }, {
//        pointToLayer: function (feature, latlng) {
//            return L.circleMarker(latlng, {
//                radius: 4,
//                fillColor: "steelblue",
//                color: "#fff",
//                weight: 1,
//                opacity: 1,
//                fillOpacity: 0.8
//            })
//                .bindPopup(feature.properties.Txns['Category'].toString());
//        }
//    });
//    // console.log(chartType);
//    markerclusters = L.markerClusterGroup({
//        maxClusterRadius: 2 * rmax,
//        // iconCreateFunction: chartType
//    });
//    map.addLayer(markerclusters);
//    markerclusters.addLayer(markers);
//    map.fitBounds(markers.getBounds());
//    map.attributionControl.addAttribution(attribution);


//    var dimcategory = ndx.dimension(d => { return d.category });
//    var farmersDim = ndx.dimension(d => { return d.id })
//    var dimcategoryGroup = dimcategory.group();
//    const all = ndx.groupAll();
//    const dimProduce = ndx.dimension(d => { d.produce })
//    const groupProduce = dimProduce.group().reduceCount(d => { return d.produce });

//    var qtyDim = dimcategory.group().reduceSum(d => { return d.quantity });

//    const dimcategoryGroupFilter = dimcategory.group().reduce(
//        function (p, v) {
//            ++p.count;
//            p.quantity += v.quantity;
//            p.avrgquantity = p.quantity / p.count;
//            return p;

//        }, function (p, v) {
//            --p.count;
//            p.quantity_sum += v.quantity;
//            p.avrgquantity = p.quantity_sum / p.count;
//            return p;
//        }, function (p, v) {
//            return { count: 0, quantity: 0, avrgquantity: 0 }

//        });
//    nasdaqCount /* dc.dataCount('.dc-data-count', 'chartGroup'); */
//        .crossfilter(ndx)
//        .groupAll(all)

//    produceChart /* dc.rowChart('#day-of-week-chart', 'chartGroup') */
//        .width(450)
//        .height(350)
//        .margins({ top: 20, left: 10, right: 10, bottom: 20 })
//        .group(qtyDim)
//        .dimension(dimcategoryGroup)
//        // Assign colors to each value in the x scale domain
//        .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
//        .label(d => d.key.split('.')[1])
//        // Title sets the row text
//        .title(d => d.value)
//        .elasticX(true)
//        .xAxis().ticks(4);

//    rowChart
//        .width(350)
//        .height(180)
//        .x(d3.scaleLinear().domain([6, 20]))
//        .elasticX(true)
//        .dimension(dimcategoryGroup)
//        .group(qtyDim)
//        .xAxis().ticks(4);


//    PieChart
//        .width(200)
//        .height(150)
//        .slicesCap(4)
//        .innerRadius(35)
//        .dimension(dimcategory)
//        .group(dimcategoryGroup)
//        .legend(dc.legend().highlightSelected(true))
//        // workaround for #703: not enough data is accessible through .label() to display percentages
//        .on('pretransition', function (chart) {
//            chart.selectAll('text.pie-slice').text(function (d) {
//                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
//            })
//        });
//    // id: 30

//    dataTable.width(800).height(250)
//        .dimension(farmersDim)
//        // .group(function(d) { return "List of all Farmers"})
//        .size(10)
//        .columns([
//            function (d) { return d.category; },
//            function (d) { return d.produce; },
//            function (d) { return d.breed; },
//            function (d) { return d.breedGender },
//            function (d) { return d.quantity }

//        ])
//        .sortBy(function (d) { return d.quantity; })
//        // (optional) sort order, :default ascending
//        .order(d3.ascending)
//    bubbleChart.width(500)
//        .height(500)
//        .dimension(dimcategory)
//        .group(dimcategoryGroupFilter)
//        .transitionDuration(1500)
//        .colors(["#a60000", "#ff0000", "#ff4040", "#ff7373", "#67e667", "#39e639", "#00cc00"])
//        .colorDomain([0, 120])
//        .x(d3.scaleLinear().domain([0, 200]))
//        .r(d3.scaleLinear().domain([0, 150]))
//        .keyAccessor(function (p) {
//            return p.value.avrgquantity;
//        })
//        .valueAccessor(function (p) {
//            return p.value.quantity_sum;
//        })
//        .radiusValueAccessor(function (p) {
//            return p.value.count;
//        })
//        .transitionDuration(1500)
//        .elasticY(true)
//        .yAxisPadding(1)
//        .xAxisPadding(1)
//        .label(function (p) {
//            return p.key;
//        })
//        .renderLabel(true)
//        .renderlet(function (chart) {
//            rowChart.filter(chart.filter());
//        })
//        .on("postRedraw", function (chart) {
//            dc.events.trigger(function () {
//                rowChart.filter(chart.filter());
//            });
//        });

//    dc.renderAll();
//});

//function defineFeature(feature, latlng) {
//    var categoryVal = feature.properties.Txns['category'];
//    // no icon val for now
//    //var myClass = 'marker category-' + categoryVal + ' icon-' + iconVal;
//    var myClass = 'marker category-' + categoryVal;
//    var myIcon = L.divIcon({
//        className: myClass,
//        iconSize: null
//    });
//    return L.marker(latlng, { icon: myIcon });
//}
//function defineFeaturePopup(feature, layer) {
//    var props = feature.properties,
//        // fields = metadata.fields,
//        popupContent = '';
//    // popupFields.map(function (key) {
//    //     if (props[key]) {
//    //         var val = props[key],
//    //             label = fields[key].name;

//    //         if (fields[key].lookup) {
//    //             val = fields[key].lookup[val];
//    //         }
//    //         if (typeof (val) != 'undefined') {
//    //             popupContent += '<span class="attribute"><span class="label" style="color: #000000">' + label + ':</span> ' + val + '</span>';
//    //         }
//    //     }
//    // });
//    popupContent += '<span class="attribute"><span class="label">' + props.Name + ':</span>' + props.Phone + '</span>';
//    console.log(popupContent);
//    popupContent = '<div class="map-popup">' + popupContent + '</div>';
//    layer.bindPopup(popupContent, { offset: L.point(1, -2) });
//}
//// create array from geojson data
//$.ajax({
//    url: "/Home/getFarmersProfile",
//    type: "GET",
//    contentType: "application/json; charset=utf-8",
//    success: function (data) {
//        createArrayFromGeoJson(data);
//        console.log(data);
//        alert("Data loaded successfully");
//    },
//    error: function (error) {
//        alert('failed retreiving polygons');
//        alert(error.status + ": " + error.responseText);
//    }
//});
//function createArrayFromGeoJson(data, callback) {
//    var array = [];
//    console.log("Translating GeoJSON into array of rows...");
//    for (var i = 0; i < data.features.length; i++) {
//        var row = "{";
//        for (var property in data.features[i].properties) {
//            if (json.features[i].properties.hasOwnProperty(property)) {
//                row += "\"" + property + "\":" + JSON.stringify(data.features[i].properties[property]) + ",";
//            }
//        }
//        array.push(JSON.parse(row.substring(0, row.length - 1) + "}"));
//    }
//    console.log("Done. Total array size: " + array.length);
//    callback(array);
//}

//$(document).ready(function () {



//    //var attribution = 'Map data: <a href="http://openstreetmap.org">OSM</a>', metadata, rmax = 30;

//    //map = L.map('map').setView([-1.17315747054207, 36.7634069650127], 6);

//    //L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', { foo: 'bar' }).addTo(map);
//    //var rowChart = new dc.RowChart("#test");
//    //var PieChart = new dc.PieChart("#test2");
//    //var dataTable = new dc.DataTable('.dc-data-table');
//    //const nasdaqCount = new dc.DataCount('.dc-data-count');
//    //const produceChart = new dc.RowChart('#day-of-week-chart');
//    //const bubbleChart = new dc.BubbleChart("#dc-bubble-graph");
//    //var markerclusters = L.markerClusterGroup({  
//    //    maxClusterRadius: 2 * rmax,
//    //    iconCreateFunction: defineClusterIcon //automatically generate cluster icons
//    //});

//    //d3.json("/Home/getFarmersProfiles").then(d => {
//    //    var jsondata = d.features.map(function (txns) {
//    //        return txns.properties.Txns;
//    //    });
//    //    var geojson = d;
//    //    console.log(geojson);
//    //    metadata = geojson.properties;
//    //    var filter = crossfilter(d.features);
//    //    var filterAll = filter.groupAll();
//    //    var dataArray = jsondata.flat();
//    //    console.log(dataArray);
//    //    var ndx = crossfilter(dataArray);

//    //    // build clusters
//    //    var geomDimension = filter.dimension(d => { return d.geometry })
//    //    var markers = L.geoJson(geomDimension.top(Infinity), {
//    //        pointToLayer: defineFeature,
//    //        onEachFeature: defineFeaturePopup
//    //    }, {
//    //            pointToLayer: function (feature, lnglatlatlng) {
//    //                return L.circleMarker(latlng, {
//    //                    radius: 4,
//    //                    fillColor: "steelblue",
//    //                    color: "#fff",
//    //                    weight: 1,
//    //                    opacity: 1,
//    //                    fillOpacity: 0.8
//    //                })
//    //                    .bindPopup(feature.properties.Txns['Category'].toString());
//    //            }
//    //        });

//    //    markerclusters = L.markerClusterGroup({
//    //        maxClusterRadius: 2 * rmax,
//    //        iconCreateFunction: null
//    //    });
//    //    map.addLayer(markerclusters);
//    //    markerclusters.addLayer(markers);
//    //    map.fitBounds(markers.getBounds());
//    //    map.attributionControl.addAttribution(attribution);


//    //    var dimcategory = ndx.dimension(d => { return d.category });
//    //    var farmersDim = ndx.dimension(d => { return d.id })
//    //    var dimcategoryGroup = dimcategory.group();
//    //    const all = ndx.groupAll();
//    //    const dimProduce = ndx.dimension(d => { d.produce })
//    //    const groupProduce = dimProduce.group().reduceCount(d => { return d.produce });

//    //    var qtyDim = dimcategory.group().reduceSum(d => { return d.quantity });

//    //    const dimcategoryGroupFilter = dimcategory.group().reduce(
//    //        function (p, v) {
//    //            ++p.count;
//    //            p.quantity += v.quantity;
//    //            p.avrgquantity = p.quantity / p.count;
//    //            return p;

//    //        }, function (p, v) {
//    //            --p.count;
//    //            p.quantity_sum += v.quantity;
//    //            p.avrgquantity = p.quantity_sum / p.count;
//    //            return p;
//    //        }, function (p, v) {
//    //            return { count: 0, quantity: 0, avrgquantity: 0 }

//    //        });
//    //    nasdaqCount /* dc.dataCount('.dc-data-count', 'chartGroup'); */
//    //        .crossfilter(ndx)
//    //        .groupAll(all)

//    //    produceChart /* dc.rowChart('#day-of-week-chart', 'chartGroup') */
//    //        .width(450)
//    //        .height(350)
//    //        .margins({ top: 20, left: 10, right: 10, bottom: 20 })
//    //        .group(qtyDim)
//    //        .dimension(dimcategoryGroup)
//    //        // Assign colors to each value in the x scale domain
//    //        .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
//    //        .label(d => d.key.split('.')[1])
//    //        // Title sets the row text
//    //        .title(d => d.value)
//    //        .elasticX(true)
//    //        .xAxis().ticks(4);

//    //    rowChart
//    //        .width(350)
//    //        .height(180)
//    //        .x(d3.scaleLinear().domain([6, 20]))
//    //        .elasticX(true)
//    //        .dimension(dimcategoryGroup)
//    //        .group(qtyDim)
//    //        .xAxis().ticks(4);


//    //    PieChart
//    //        .width(200)
//    //        .height(150)
//    //        .slicesCap(4)
//    //        .innerRadius(35)
//    //        .dimension(dimcategory)
//    //        .group(dimcategoryGroup)
//    //        .legend(dc.legend().highlightSelected(true))
//    //        // workaround for #703: not enough data is accessible through .label() to display percentages
//    //        .on('pretransition', function (chart) {
//    //            chart.selectAll('text.pie-slice').text(function (d) {
//    //                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
//    //            })
//    //        });
//    //    // id: 30

//    //    dataTable.width(800).height(250)
//    //        .dimension(farmersDim)
//    //        // .group(function(d) { return "List of all Farmers"})
//    //        .size(10)
//    //        .columns([
//    //            function (d) { return d.category; },
//    //            function (d) { return d.produce; },
//    //            function (d) { return d.breed; },
//    //            function (d) { return d.breedGender },
//    //            function (d) { return d.quantity }

//    //        ])
//    //        .sortBy(function (d) { return d.quantity; })
//    //        // (optional) sort order, :default ascending
//    //        .order(d3.ascending)
//    //    bubbleChart.width(500)
//    //        .height(500)
//    //        .dimension(dimcategory)
//    //        .group(dimcategoryGroupFilter)
//    //        .transitionDuration(1500)
//    //        .colors(["#a60000", "#ff0000", "#ff4040", "#ff7373", "#67e667", "#39e639", "#00cc00"])
//    //        .colorDomain([0, 120])
//    //        .x(d3.scaleLinear().domain([0, 200]))
//    //        .r(d3.scaleLinear().domain([0, 150]))
//    //        .keyAccessor(function (p) {
//    //            return p.value.avrgquantity;
//    //        })
//    //        .valueAccessor(function (p) {
//    //            return p.value.quantity_sum;
//    //        })
//    //        .radiusValueAccessor(function (p) {
//    //            return p.value.count;
//    //        })
//    //        .transitionDuration(1500)
//    //        .elasticY(true)
//    //        .yAxisPadding(1)
//    //        .xAxisPadding(1)
//    //        .label(function (p) {
//    //            return p.key;
//    //        })
//    //        .renderLabel(true)
//    //        .renderlet(function (chart) {
//    //            rowChart.filter(chart.filter());
//    //        })
//    //        .on("postRedraw", function (chart) {
//    //            dc.events.trigger(function () {
//    //                rowChart.filter(chart.filter());
//    //            });
//    //        });

//    //    dc.renderAll();
//    //});

//    ///*Helper function*/
//    //function serializeXmlNode(xmlNode) {
//    //    if (typeof window.XMLSerializer !== "undefined") {
//    //        return (new window.XMLSerializer()).serializeToString(xmlNode);
//    //    } else if (typeof xmlNode.xml !== "undefined") {
//    //        return xmlNode.xml;
//    //    }
//    //    return "";
//    //}
//    //function defineFeature(feature, latlng) {

//    //    var categoryVal = feature.properties['SubCounty'];

//    //    var myClass = 'marker category-' + categoryVal; // asign icons depending on the category

//    //    var iconClass = L.divIcon({
//    //        className: myClass,
//    //        iconSize: null
//    //    });

//    //    return L.marker(latlng, { icon: iconClass });
//    //}
//    //function defineFeaturePopup(feature, layer) {
//    //    var props = feature.properties;
//    //    popupContent = '';
//    //    popupContent += '<span class="attribute"><span class="label" style="color: blue;"><span class="label" style="color: blue;"><span class="label" style="color: blue;">Name: ' + props.Name + '<br/></span>Phone: ' + props.Phone + '<br/></span>Gender: ' + props.Gender + '<br/></span>Sub County: ' + props.SubCounty + '</span>';
//    //    console.log(popupContent);
//    //    popupContent = '<div class="map-popup">' + popupContent + '</div>';
//    //    layer.bindPopup(popupContent, { offset: L.point(1, -2) });
//    //}
//    //function defineClusterIcon(clusters) {
//    //    var children = clusters.getAllChildMarkers(),
//    //        n = children.length, // get  the numbers of markers in clusters 
//    //        strokeWidth = 1, // set the cluster pie stroke
//    //        r = rmax - 2 * strokeWidth - (n < 10 ? 12 : n < 100 ? 8 : n < 1000 ? 4 : 0),
//    //        iconDim = (r + strokeWidth) * 2,
//    //        data = d3.nest() // creates a corpus for the pie chart
//    //            .key(function (d) {
//    //                return d.feature.properties['SubCounty'];
//    //            })
//    //            .entries(children, d3.map),

//    //        html = bakeThePie({
//    //            data: data,
//    //            valueFunc: function (d) { return d.values.length; },
//    //            strokeWidth: 1,
//    //            outerRadius: r,
//    //            innerRadius: r - 10,
//    //            pieClass: 'cluster-pie',
//    //            pieLabel: n,
//    //            pieLabelClass: 'marker-clumarker-cluster-pie-labelster',
//    //            pathClassFunc: function (d) { return "category-" + d.data.key; },
//    //            //pathTitleFunc: function (d) { return metadata['SubCounty'] + ' (' + d.data.values.length + ' Category' + (d.data.values.length !== 1 ? 's' : '') + ')'; }
//    //        });
//    //    iconClass = new L.DivIcon({
//    //        html: html,
//    //        className: 'marker-cluster',
//    //        iconSize: new L.point(iconDim, iconDim)
//    //    });
//    //    return iconClass;
//    //}
//    //function bakeThePie(options) {
//    //    if (!options.data || !options.valueFunc) {
//    //        return '';
//    //    }
//    //    var data = options.data,
//    //        valueFunc = options.valueFunc,
//    //        r = options.outerRadius ? options.outerRadius : 28, //Default outer radius = 28px
//    //        rInner = options.innerRadius ? options.innerRadius : r - 10, //Default inner radius = r-10
//    //        strokeWidth = options.strokeWidth ? options.strokeWidth : 1, //Default stroke is 1
//    //        pathClassFunc = options.pathClassFunc ? options.pathClassFunc : function () { return ''; }, //Class for each path
//    //        pathTitleFunc = options.pathTitleFunc ? options.pathTitleFunc : function () { return ''; }, //Title for each path
//    //        pieClass = options.pieClass ? options.pieClass : 'marker-cluster-pie', //Class for the whole pie
//    //        pieLabel = options.pieLabel ? options.pieLabel : d3.sum(data, valueFunc), //Label for the whole pie
//    //        pieLabelClass = options.pieLabelClass ? options.pieLabelClass : 'marker-cluster-pie-label',//Class for the pie label

//    //        origo = (r + strokeWidth), //Center coordinate
//    //        w = origo * 2, //width and height of the svg element
//    //        h = w,
//    //        donut = d3.pie(),
//    //        arc = d3.arc().innerRadius(rInner).outerRadius(r);
//    //    //Create an svg element
//    //    var svg = document.createElementNS(d3.namespace.svg, 'svg');
//    //    //Create the pie chart
//    //    var vis = d3.select(svg)
//    //        .data([data])
//    //        .attr('class', pieClass)
//    //        .attr('width', w)
//    //        .attr('height', h);

//    //    var arcs = vis.selectAll('g.arc')
//    //        .data(donut.value(valueFunc))
//    //        .enter().append('svg:g')
//    //        .attr('class', 'arc')
//    //        .attr('transform', 'translate(' + origo + ',' + origo + ')');

//    //    arcs.append('svg:path')
//    //        .attr('class', pathClassFunc)
//    //        .attr('stroke-width', strokeWidth)
//    //        .attr('d', arc)
//    //        .append('svg:title')
//    //        .text(pathTitleFunc);

//    //    vis.append('text')
//    //        .attr('x', origo)
//    //        .attr('y', origo)
//    //        .attr('class', pieLabelClass)
//    //        .attr('text-anchor', 'middle')
//    //        //.attr('dominant-baseline', 'central')
//    //        /*IE doesn't seem to support dominant-baseline, but setting dy to .3em does the trick*/
//    //        .attr('dy', '.3em')
//    //        .text(pieLabel);
//    //    //Return the svg-markup rather than the actual element
//    //    return serializeXmlNode(svg);
//    //}

//});


