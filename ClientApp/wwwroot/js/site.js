const map = L.map("map").setView([-1.17315747054207, 36.7634069650127], 15);
L.tileLayer("https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png", {
  foo: "bar",
}).addTo(map);
var metadata,
  rmax = 30;
const markerclusters = L.markerClusterGroup({
    maxClusterRadius: 2 * rmax,
    ////iconCreateFunction: defineClusterIcon //this is where the magic happens
});
map.addLayer(markerclusters);

const rowChartAgriactivities = new dc.RowChart("#rowchart");
const revRowChart = new dc.RowChart("#revRowChart");
const numberOfFarmers = new dc.DataCount(".dc-data-count");


d3.json("Home/getFarmersProfile").then((d, error) => {
  if (!error) {
      var data = JSON.parse(d);

      console.log(data);
      var trans = data.features.map(sa => {
          return sa.properties.Txns
      });
      var data2 = trans.flat();
      console.log(data2)
      var dataP = []
      var pos = {}
      data2.forEach(function (d) {
          var geo = data.features.find(f => f.properties.Id === d.TransactionId);
          //console.log(geo);
          var points = geo.geometry.coordinates;
         // console.log(points)
          //if (Array.isArray(points[0][0]))
          //    points = geo.geometry.coordinates.reduce(function (p, v) {
          //        return p.concat(v);
          //    }, []);
          //var p = [d3.sum(points, p => +p[1]) / points.length, d3.sum(points, p => +p[0]) / points.length];
         
          pos[d.TransactionId] = points;
          //console.log(pos)
          //d.sum = 0;
          //for (var p in d)
          //    if (p && p != "code" && p != "sum") {
          //        dataP.push({ 'code': d.code, 'type': p, 'value': +d[p] });
          //        d.sum += +d[p];
          //    }
          //if (d.sum > max)
          //    max = d.sum;
      });

      console.log(pos);

    var metadata = data.properties;

      var markers = L.geoJson(data, {
          pointToLayer: defineFeature,
          onEachFeature: defineFeaturePopup
      });

      markerclusters.addLayer(markers);
      map.fitBounds(markers.getBounds());

    const ndx = crossfilter(data.features);

    function reduceAdd(p, v) {
      ++p.count;
      p.Quantity += v.Quantity;
      return p;
    }

    function reduceRemove(p, v) {
      --p.count;
      p.Quantity -= v.Quantity;
      return p;
    }

    function reduceInitial() {
      return { count: 0, Quantity: 0 };
    }

    function orderValue(p) {
      return p.Quantity;
    }

    var all = ndx.groupAll();
    var everything = ndx.dimension(function (d) {
      return d;
    });

    const geomDimension = ndx.dimension((d) => {
      d.geometry;
    });

      var geoJsonLayer = L.geoJson({
          type: 'FeatureCollection',
          features: geomDimension.top(Infinity)
      }, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, {
                  radius: 4,
                  fillColor: "steelblue",
                  color: "#fff",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
              })
                  .bindPopup(feature.properties['Name'].toString());
          }
      }).addTo(map);
   

    const rowChartAgriactivitiesDim = ndx.dimension(
      (d) => d.properties.Txns.map((c) => c.Category),
      true
    );

    const rowChartAgriactivitiesDimgrp = rowChartAgriactivitiesDim.group();
    rowChartAgriactivities
      .dimension(rowChartAgriactivitiesDim)
      .group(rowChartAgriactivitiesDimgrp)
      .height(150)
      .cap(5)
      .elasticX(true)
      .transitionDuration(1500)
      .xAxis()
      .ticks(5);

    // row chart of farm produce //
    const revDim = ndx.dimension(
      (d) => d.properties.Txns.map((sa) => sa.Produce),
      true
    );
    const revGrp = revDim.group();
    revRowChart
      .dimension(revDim)
      .group(revGrp)
      .height(150)
      .cap(5)
      .elasticX(true)
      .transitionDuration(1500)
      .xAxis()
      .ticks(5);

    // data -count-chart
    numberOfFarmers
      .dimension(ndx)
      .group(all)
      .html({
        some:
          "<strong>%filter-count</strong> selected from a total of <strong>%total-count</strong> records" +
          " | <a href='javascript:dc.filterAll(); dc.renderAll();'>Reset All</a>",
        all:
          "All records selected. Select a graph or interact with the map to apply filters",
      });

    dc.renderAll(); // render all charts

    // chart  Listeners

    rowChartAgriactivities.on("filtered", function (chart, filter) {
      updateMap();
    });
    revRowChart.on("filtered", function (chart, filter) {
      updateMap();
    });

    function updateMap() {
      // trying to update pie markers according the filters
      markers.clearLayers();
      markers.addData({
        type: "FeatureCollection",
        features: everything.top(Infinity),
      });
      markerclusters.clearLayers();
      markerclusters.addLayer(markers);
    }

    // map listeners

    map.on("moveend", function () {
      updateMapFilter();
    });
    map.on("zoomend", function () {
      updateMapFilter();
    });

    // mapfilters
    function updateMapFilter() {
      var bounds = map.getBounds(),
        n = bounds._northEast.lat,
        e = bounds._northEast.lng,
        s = bounds._southWest.lat,
        w = bounds._southWest.lng;
      var boundsFeature = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [w, s],
              [w, n],
              [e, n],
              [e, s],
              [w, s],
            ],
          ],
        },
      };
      // console.log(boundsFeature);
      geomDimension.filter(function (d) {
        //make feature
        var point = {
          type: "Feature",
          geometry: d,
        };

        //console.log(point);
        // return turf.inside(point, boundsFeature);
        return point;
      });

      dc.redrawAll();
    }
  } else {
    console.log("could not load data");
  }
});
//}

function defineClusterIconAsBarChart(cluster) {
  var children = cluster.getAllChildMarkers();
  console.log(children);
  var n = children.length,
    strokeWidth = 1;

  var dataset = d3
    .nest() //Build a dataset for the pie chart
    .key(function (d) {
      return d.feature.properties.Txns.map((d) => d.Category[0]);
    })
    .entries(children, d3.map);

  //console.log(dataset);

  var r = 30 - 2 * 1 - (n < 10 ? 12 : n < 100 ? 8 : n < 1000 ? 4 : 0), //Calculate clusterpie radius...
    origo = r + 1, //Center coordinate
    w = origo * 2, //width and height of the svg element
    h = w,
    iconDim = (r + 1) * 2;

  var x = d3.scaleBand().range([0, w]).padding(0.1);
  var y = d3.scaleLinear().range([h, 0]);
  x.domain(
    dataset.map(function (d) {
      return d.key;
    })
  );
  y.domain([
    0,
    d3.max(dataset, function (d) {
      return d.values.length;
    }),
  ]);

  // create a svg element
  var svg = document.createElementNS(d3.namespace.svg, "svg");

  var vis = d3
    .select(svg)
    .attr("width", w)
    .attr("height", h)
    .append("g")
    .attr("transform", "translate(" + h / 200 + "," + w / 200 + ")"); //center g

  vis
    .selectAll(".bar")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return x(d.key);
    })
    .attr("y", function (d) {
      return y(d.values.length);
    })
    .attr("width", x.bandwidth())
    .attr("text", function (d) {
      return d.key;
    })
    //.on('mouseover', tip.show)
    //.on('mouseout', tip.hide)
    .attr("height", function (d) {
      return h - y(d.values.length);
    });

  // add the x Axis
  vis
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")"); //.call(d3.axisBottom(x));

  // add the y Axis
  vis.append("g").attr("class", "y axis"); //.call(d3.axisLeft(y));

  var html = serializeXmlNode(svg);
  var myIcon = new L.DivIcon({
    html: html,
    className: "mycluster",
    iconSize: new L.Point(iconDim, iconDim),
  });
  return myIcon;
}
function defineClusterIcon(cluster) {
    var children = cluster.getAllChildMarkers(),
        n = children.length, //Get number of markers in cluster
        strokeWidth = 1, //Set clusterpie stroke width
        r = rmax - 2 * strokeWidth - (n < 10 ? 12 : n < 100 ? 8 : n < 1000 ? 4 : 0), //Calculate clusterpie radius...
        iconDim = (r + strokeWidth) * 2, //...and divIcon dimensions (leaflet really want to know the size)
        data = d3
            .nest() //Build a dataset for the pie chart
            .key((d) => d.feature.properties.Txns.Category)
            
      .entries(children, d3.map),
    
    html = bakeThePie({
      data: data,
      valueFunc: function (d) {
        return d.values.length;
      },
      strokeWidth: 1,
      outerRadius: r,
      innerRadius: r - 10,
      pieClass: "cluster-pie",
      pieLabel: n,
      pieLabelClass: "marker-cluster-pie-label",
      pathClassFunc: function (d) {
        return "category-" + d.data.key;
      },
      pathTitleFunc: function (d) {
          return d.data.key + '(' + d.data.values.length + ')';
      },
    }),
    //Create a new divIcon and assign the svg markup to the html property
    myIcon = new L.DivIcon({
      html: html,
      className: "marker-cluster",
      iconSize: new L.Point(iconDim, iconDim),
    });
    console.log(data);
    //console.log()
  return myIcon;
}
function renderLegend() {
  //var data = d3.entries(metadata.Txns.map(sa=>sa.Category)),
  //    legenddiv = d3.select('body').append('div')
  //        .attr('id', 'legend');

  console.log(metadata);
  //var heading = legenddiv.append('div')
  //    .classed('legendheading', true)
  //    .text(metadata.Txns.map(sa => sa.Category));
  //var legenditems = legenddiv.selectAll('.legenditem')
  //    .data(data);
  //legenditems
  //    .enter()
  //    .append('div')
  //    .attr('class', function (d) {
  //        return 'category-' + d.key;
  //    })
  //    .classed({ 'legenditem': true })
  //    .text(function (d) {
  //        return d.value;
  //    });
}
function serializeXmlNode(xmlNode) {
  if (typeof window.XMLSerializer != "undefined") {
    return new window.XMLSerializer().serializeToString(xmlNode);
  } else if (typeof xmlNode.xml != "undefined") {
    return xmlNode.xml;
  }
  return "";
}
function bakeThePie(options) {
  /*data and valueFunc are required*/
  if (!options.data || !options.valueFunc) {
    return "";
  }
  var data = options.data,
    valueFunc = options.valueFunc,
    r = options.outerRadius ? options.outerRadius : 8, //Default outer radius = 28px
    rInner = options.innerRadius ? options.innerRadius : r - 10, //Default inner radius = r-10
    strokeWidth = options.strokeWidth ? options.strokeWidth : 1, //Default stroke is 1
    pathClassFunc = options.pathClassFunc
      ? options.pathClassFunc
      : function () {
          return "";
        }, //Class for each path
    pathTitleFunc = options.pathTitleFunc
      ? options.pathTitleFunc
      : function () {
          return "";
        }, //Title for each path
    pieClass = options.pieClass ? options.pieClass : "marker-cluster-pie", //Class for the whole pie
    pieLabel = options.pieLabel ? options.pieLabel : d3.sum(data, valueFunc), //Label for the whole pie
    pieLabelClass = options.pieLabelClass
      ? options.pieLabelClass
      : "marker-cluster-pie-label", //Class for the pie label
    origo = r + strokeWidth, //Center coordinate
    w = origo * 2, //width and height of the svg element
    h = w,
    donut = d3.pie(),
    arc = d3.arc().innerRadius(rInner).outerRadius(r);
  //Create an svg element
  const svg = document.createElementNS(d3.namespaces.svg, "svg");
  // var svg = document.createElementNS(d3.ns.prefix.svg, 'svg');
  //Create the pie chart
  var vis = d3
    .select(svg)
    .data([data])
    .attr("class", pieClass)
    .attr("width", w)
    .attr("height", h);
  var arcs = vis
    .selectAll("g.arc")
    .data(donut.value(valueFunc))
    .enter()
    .append("svg:g")
    .attr("class", "arc")
    .attr("transform", "translate(" + origo + "," + origo + ")");
  arcs
    .append("svg:path")
    .attr("class", pathClassFunc)
    .attr("stroke-width", strokeWidth)
    .attr("d", arc)
    .append("svg:title")
    .text(pathTitleFunc);
  vis
    .append("text")
    .attr("x", origo)
    .attr("y", origo)
    .attr("class", pieLabelClass)
    .attr("text-anchor", "middle")
    //.attr('dominant-baseline', 'central')
    /*IE doesn't seem to support dominant-baseline, but setting dy to .3em does the trick*/
    .attr("dy", ".3em")
    .text(pieLabel);
  //console.log(svg);
  return serializeXmlNode(svg);
}
function defineFeature(feature, latlng) {
    var categoryVal = feature.properties.Txns.map((d) => {
        return d.Category;
    });
   // console.log(categoryVal);
  //var myClass = "marker category-" + categoryVal[0];
  var iconClass = L.divIcon({
      className: 'marker',
    iconSize: null,
  });
  //console.log(myClass);
  return L.marker(latlng, { icon: iconClass });
}
function defineFeaturePopup(feature, layer) {
  var props = feature.properties,
    popupContent = "";
  popupContent +=
    '<span class="attribute"><span class="label" style="color: #000000">' +
    props.Name +
    ":</span> " +
    props.Phone +
    "</span>";
  popupContent = '<div class="map-popup">' + popupContent + "</div>";
    layer.bindPopup(popupContent, { offset: L.point(1,101 });
    console.log(popupContent);
}
function changeChart() {
  // markercluster.clearLayers();
  if (document.getElementById("buttonUpdateChart").innerText == "Bar Chart") {
    document.getElementById("buttonUpdateChart").innerText = "Pie Chat";

    // init(defineClusterIconAsBarChart);
  } else {
    document.getElementById("buttonUpdateChart").innerText = "Bar Chart";
    init(defineClusterIcon);
  }
}
