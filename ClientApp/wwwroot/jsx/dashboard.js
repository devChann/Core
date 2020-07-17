//global  variables

var chartConfig = {
    target: 'spinner'
};

var opts = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#ffffff', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning

};
var target = document.getElementById(chartConfig.target);

function init() {
   

    var spinner = new Spinner(opts).spin(target);

    d3.json("Home/getFarmersProfile").then((data) => {

        spinner.stop();

        drawMarkers(data);
    });
}

init();

function drawMarkers(d) {
  var data = JSON.parse(d);

  //console.log(data);
  var trans = data.features.map((sa) => {
    return sa.properties.Txns;
  });
  var data2 = trans.flat();
 // console.log(data2);
  var dataP = [];
  var pos = {};
  data2.forEach(function (d) {
      var geo = data.features.find((f) => f.properties.Id === d.TransactionsId);
      //console.log(geo);
      var points = geo.geometry.coordinates;
    var attributes = geo.properties;
      pos[d.TransactionsId] = points;
      dataP.push({
          'Name': attributes.Name,
          'Phone': attributes.Phone,
          'SubCounty': attributes.SubCounty,
          'Ward': attributes.Ward,
          'Age': d.Age,
          'AmtofMilkdp': d.AmtofMilkdp,
          'Breed': d.Breed,
          'BreedGender': d.BreedGender,

        'Category': d.Category,
        'Id': d.Id,
        'Produce': d.Produce,
        'Quantity': d.Quantity,
        'Revenue': "",
        'TransactionsId':d.TransactionsId,
        'UpdateTime': d.UpdateTime })
  
  });
  
    const xf = crossfilter(dataP);
    //console.log(dataP);
    console.log(dataP);
    var groupname = "marker-select";
    var farmersDim = xf.dimension(function (d) {
        return d.TransactionsId;
    });
    var farmersDimGrp = farmersDim.group().reduce(
        (p, v) => {
            ++p.count;
            p.Name = v.Name;
            p.Phone = v.Phone;
            p.Ward = v.Ward


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
        //console.log(tempcoordinates);
      return tempcoordinates.reverse();
    })
      .dimension(farmersDim)
      .group(farmersDimGrp)
    .center([-1.17315747054207, 36.7634069650127])
    .zoom(5)
    .popup((d, marker) => {
      popupContent = "";
      popupContent +=
        '<ul style="list-style-type:none;padding-inline-start: 5px !important;>' +
            '<li><span class="attribute">' + 'Name :' + '<span class="label" style="color: #000000">' + d.value.Name + '</span></span></li>'+
            ' <li><span class="attribute">' + 'Phone :' + '<span class="label" style="color: #000000">' + d.value.Phone +  '</span></span></li>'+
            ' <li><span class="attribute">' + 'Ward :' + '<span class="label" style="color: #000000">' + d.value.Ward +  '</span></span></l> '+
          '</ul>';
      popupContent = '<div class="map-popup">' + popupContent + "</div>";
     // console.log(d.key);
      return popupContent;
    })
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

    const farmer = xf.dimension((d) => d.TransactionsId);

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

    return {
        marker: marker,
        pie: pie
    };
}
