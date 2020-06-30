d3.json("Home/getFarmersProfile").then((data) => {
  drawMarkerSelect(data);
});

function drawMarkerSelect(data) {
  var data = JSON.parse(data);

  console.log(data);
  var trans = data.features.map((sa) => {
    return sa.properties.Txns;
  });
  var data2 = trans.flat();
  console.log(data2);
  var dataP = [];
  var pos = {};
  data2.forEach(function (d) {
    var geo = data.features.find((f) => f.properties.Id === d.TransactionId);
    var points = geo.geometry.coordinates;
    pos[d.TransactionId] = points;
  });
  console.log(pos);
  const xf = crossfilter(data2);

  var groupname = "marker-select";
  var facilities = xf.dimension(function (d) {
    return d.TransactionId;
  });
  var facilitiesGroup = facilities.group().reduceSum((d) => d.Quantity);

  var marker = dc_leaflet
    .markerChart(".map", groupname)
    .locationAccessor(function (d) {
      var tempcoordinates = pos[d.key];
      return tempcoordinates.reverse();
    })
    .dimension(facilities)
    .group(facilitiesGroup)
    .center([-1.17315747054207, 36.7634069650127])
    .zoom(7)
    .cluster(true);

  var types = xf.dimension((d) => d.Category);
  var typesGroup = types.group().reduceSum((d) => d.Quantity);

  var pie = dc
    .pieChart(".pie", groupname)
    .dimension(types)
    .group(typesGroup)
    .width(150)
    .height(150)
    .renderLabel(true)
    .renderTitle(true)
    .ordering(function (p) {
      return -p.value;
    });
  const farmProduceDim = xf.dimension((d) => d.Produce);
  const farmProduceDimGrp = farmProduceDim
    .group()
    .reduceCount((d) => d.Produce);

  const rowChartAgriactivities = dc
    .rowChart(".rowChart", groupname)
    .dimension(farmProduceDim)
    .group(farmProduceDimGrp)
    .height(420)
    .elasticX(true)
    .transitionDuration(1500)
    .xAxis()
    .ticks(5);

  const farmer = xf.dimension((d) => d.TransactionId);

  const nasdaqTable = dc
    .dataTable(".dc-data-table", groupname)
    .dimension(farmer)
    .group((d) => {
      return "";
    })
    .size(5)
    .columns(["Category", "Produce", "Quantity", "Revenue", "Id"])
    .order(d3.ascending)
    .on("renderlet", function (table) {
      table.selectAll(".dc-table-group").classed("info", true);
    });

  const mainAgriActivitiesDim = xf.dimension((d) => d.Category);
  const mainAgriActivitiesDimGrp = mainAgriActivitiesDim
    .group()
    .reduceCount((d) => d.Category);

  const mainAgriActivities = dc
    .barChart(".mainBarChart", groupname)
    .height(100)
    .dimension(mainAgriActivitiesDim)
    .group(mainAgriActivitiesDimGrp)
    .centerBar(false)
    .x(d3.scaleLinear().domain([100, 700]))
    .gap(2);
  const revenueDim = xf.dimension((d) => d.Category);
  const revenueDimGrp = revenueDim.group().reduceSum((d) => d.Revenue);
  const all = xf.groupAll();
  const revenuePie = dc
    .pieChart(".revenuePie", groupname)
    .dimension(revenueDim)
    .group(revenueDimGrp)
    .width(150)
    .height(150)
    .transitionDuration(1500)
    .renderLabel(true)
    .renderTitle(true)
    .ordering(function (p) {
      return -p.value;
    });

  const nasdaqCount = dc
    .dataCount(".dc-data-count", groupname)
    .dimension(xf)
    .group(all);

  dc.renderAll(groupname);
  return { marker: marker, pie: pie };
}
