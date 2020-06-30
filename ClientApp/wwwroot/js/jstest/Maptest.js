d3.json("Home/getFarmersProfile").then((d, error) => {
    if (!error) {
        var data = JSON.parse(d);
        var metadata = data.properties;
        console.log(data);
        renderMarkers(data);

    }
})
//d3.json("/getFarmersProfile/").then((data, error) => {
//    if (!error) {
//        geojson = JSON.parse(data);

//        renderMarkers(data);

//    } else {
//        console.log("error")
//    }
//})
function renderMarkers(json) {
    var xf = crossfilter(json.features);
    var groupname = "marker-select";
    var facilities = xf.dimension(function (d) { return d.geometry; });
    var facilitiesGroup = facilities.group().reduceCount();

    var marker = dc_leaflet.markerChart("#demo1 .map", groupname)
        .dimension(facilities)
        .group(facilitiesGroup)
        .width(600)
        .height(400)
        .center([42.69, 25.42])
        .zoom(7)
        .cluster(true);

    var types = xf.dimension(d=>d.properties.Txns.map(r=>r.Category),true);
    var typesGroup = types.group().reduceCount();

    var pie = dc.pieChart("#demo1 .pie", groupname)
        .dimension(types)
        .group(typesGroup)
        .width(200)
        .height(200)
        .renderLabel(true)
        .renderTitle(true)
        .ordering(function (p) {
            return -p.value;
        });

    dc.renderAll(groupname);
    return { marker: marker, pie: pie };

}