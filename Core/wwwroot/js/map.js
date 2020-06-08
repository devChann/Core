$(document).ready(() => {
  const map = L.map("map").setView([-1.17315747054207, 36.7634069650127], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png", {
    foo: "bar",
  }).addTo(map);

  const rowChart = new dc.RowChart("#rowChart");
  const PieChart = new dc.PieChart("#test2");
  const dataTable = new dc.DataTable(".dc-data-table");
  const nasdaqCount = new dc.DataCount(".dc-data-count");
  const produceChart = new dc.RowChart("#day-of-week-chart");
  const bubbleChart = new dc.BubbleChart("#dc-bubble-graph");

  function loadData(data) {
    console.log("data loaded successfully");
    console.log(data.features);

    const temPData = data.features.map((sa) => {
      return sa.properties.Txns;
    });
    console.log(temPData.flat());

    // create data frames
    const ndx1 = crossfilter(temPData.flat());
    const ndx = crossfilter(data.features);

    // create map dim;
    const geoDimension = ndx.dimension((d) => {
      d.geometry;
    });

    var markers = L.geoJson(
      geoDimension.top(Infinity),
      {
        pointToLayer: defineFeature,
        onEachFeature: difineFeaturePopup,
      },
      {
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 8,
            fillColor: "steelblue",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
          }).bindPopup();
        },
      }
    );
    var rmax = 30;
    var markercluster = L.markerClusterGroup({
      maxClusterRadius: 2 * rmax,
    });
    map.addLayer(markercluster);
    markercluster.addLayer(markers);
    // map.fitBound(markers.getBound());

    var catDim = ndx1.dimension((d) => d.Id);
    const catDimGroup = catDim.group();

    rowChart
      .renderLabel(true)
      .height(200)
      .width(250)
      .dimension(catDim)
      .group(catDimGroup)
      .cap(3)
      .ordering(function (d) {
        return -d.value;
      })
      .xAxis()
      .ticks(3);

    dataTable
      .dimension(catDim)
      .group(() => {
        return "";
      })

      .columns([
        "Id",
        "Category",
        "Produce",
        "Breed",
        "BreedGender",
        "Quantity",
        "Age",
      ])
      .sortBy(function (d) {
        return d.id;
      })
      .on("renderlet", function (table) {
        table.selectAll(".dc-table-group").classed("info", true);
      });
  }
  function defineFeature(feature, latlng) {
    var catogoryVal = feature.properties.Txns["Category"];
    var myClass = "marker category-" + catogoryVal;
    var iconClass = L.divIcon({
      className: myClass,
      iconSize: null,
    });
    return L.marker(latlng, { icon: iconClass });
  }
  function difineFeaturePopup(feature, layer) {
    var props = feature.properties;
    popContent = "";
    popContent +=
      '<span class="attribute"><span class="label" style="color: blue;"><span class="label" style="color: blue;"><span class="label" style="color: blue;">Name: ' +
      props.Name +
      "<br/></span>Phone: " +
      props.Phone +
      "<br/></span>Gender: " +
      props.Gender +
      "<br/></span>Sub County: " +
      props.SubCounty +
      "</span>";
  }
  $.ajax({
    url: "Core/getFarmersProfile",
    type: "GET",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      //const jsonData = data.features.map((x) => {
      //    return x.properties.Txns;
      //});
      const jsonData = JSON.parse(data);
      loadData(jsonData);
    },
    error: function (error) {
      alert(error.status + ": " + error.responseText);
    },
  });
});
