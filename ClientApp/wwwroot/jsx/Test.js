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
  var att = [];
  data2.forEach(function (d) {
    var geo = data.features.find((f) => f.properties.Id === d.TransactionId);
    var points = geo.geometry.coordinates;
    var attributes = geo.properties;
    pos[d.TransactionId] = points;
    for (var p in pos) {
      att.push({
        TransactionId: d.TransactionId,
        Name: attributes.Name,
        Phone: attributes.Phone,
      });
    }
  });
  d3.map(pos, function (d) {
    return d.TransactionId;
  }).keys();

  console.log(pos);
  console.log(d3.keys(att));
  const xf = crossfilter(data2);

  var groupname = "marker-select";
  var facilities = xf.dimension(function (d) {
    return d.TransactionId;
  });
  var facilitiesGroup = facilities.group().reduce(
    (p, v) => {
      ++p.count;
      p.Produce = v.Produce;
      p.Category = v.Category;
      return p;
    },
    (p, v) => {
      --p.count;
      return p;
    },
    () => {
      return { count: 0 };
    }
  );

  var marker = dc_leaflet
    .markerChart(".map", groupname)
    .locationAccessor(function (d) {
      var tempcoordinates = pos[d.key];
      return tempcoordinates.reverse();
    })
    .dimension(facilities)
    .group(facilitiesGroup)
    .center([-1.17315747054207, 36.7634069650127])
    .zoom(5)
    .popup((d, marker) => {
      popupContent = "";
      popupContent +=
        '<span class="attribute"><span class="label" style="color: #000000">' +
        d.value.Category +
        ":</span> " +
        d.value.Produce +
        "</span>";
      popupContent = '<div class="map-popup">' + popupContent + "</div>";
      console.log(d.key);
      return popupContent;
    })
    .filterByArea(true)
    .cluster(true);

  var types = xf.dimension((d) => d.Breed);
  var typesGroup = types.group().reduceCount();

  var pie = dc
    .pieChart(".pie", groupname)
    .dimension(types)
    .group(typesGroup)
    .width(150)
    .height(150)
    .renderLabel(true)
    .renderTitle(true)
    .radius(80)
    .ordering(function (p) {
      return -p.value;
    });
  // .label((d) => {
  //   if (pie.hasFilter() && !pie.hasFilter(d.key)) {
  //     return `${d.key}(0%)`;
  //   }
  //   let label = d.key;
  //   if (all.value()) {
  //     label += `(${Math.floor((d.value / all.value()) * 100)}%)`;
  //   }
  //   return label;
  // });
  const farmProduceDim = xf.dimension((d) => d.Produce);
  const farmProduceDimGrp = farmProduceDim
    .group()
    .reduceCount((d) => d.Produce);

  const rowChartAgriactivities = dc
    .rowChart(".rowChart", groupname)
    .dimension(farmProduceDim)
    .group(farmProduceDimGrp)
    .height(550)
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
    .size(16)
    .columns(["Category", "Produce", "Quantity", "Revenue"])
    .order(d3.ascending)
    .on("renderlet", function (table) {
      table.selectAll(".dc-table-group").classed("info", true);
    });

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

  const QtyDim = xf.dimension((d) => d.Category);
  const QtyDimGrp = QtyDim.group().reduceSum((d) => d.Quantity / 1000);
  const qtyChart = dc
    .barChart(".qtyChart", groupname)
    .width(300)
    .height(150)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .brushOn(false)
    .xAxisLabel("Agri Activities")
    .yAxisLabel("Quantity * 10k")
    .dimension(QtyDim)
    .barPadding(0.1)
    .outerPadding(0.05)
    .group(QtyDimGrp)
    .yAxis()
    .ticks(5);
  const revDimension = xf.dimension((d) => d.Category);
  const revDimensionGrp = revDimension.group().reduceCount();
  const revrowChart = dc
    .rowChart(".revrowChart", groupname)
    .width(300)
    .height(150)
    .x(d3.scaleLinear().domain([6, 20]))
    .elasticX(true)
    .dimension(revDimension)
    .group(revDimensionGrp)
    .xAxis()
    .ticks(6);

  dc.renderAll(groupname);

  return { marker: marker, pie: pie };
}
