$(document).ready(() => {
  const map = L.map("map").setView([-1.17315747054207, 36.7634069650127], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png", {
    foo: "bar",
  }).addTo(map);

  //(async () => {
  //    const data = await fetch("https://localhost:5001/Core/getFarmersProfile")
  //    console.log(data)
  //    return data
  //})();
  function loadData(data) {
    console.log("data loaded successfully");
    console.log(data.features);

    //var returnedObject = data.features.map(txn => {
    //    return txn.properties["Txns"];
    //})
    //console.log(returnedObject);

    var ndx = crossfilter(data.features);

    var topicsDim = ndx.dimension(function (d) {
      return d.properties["Txns"];
    }, true);
    console.log(topicsDim);
    //var roleDimension = ndx.dimension(d => d.features.map(r => r.properties["Txns"]), true);
    //console.log(roleDimension);

    // build clusters

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
            radius: 4,
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
