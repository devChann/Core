//global  variables

var chartConfig = {
  target: "spinx",
};

var target = document.getElementById(chartConfig.target);
function init() {

  var element = lv.create(document.getElementById(chartConfig.target));

  d3.json("Home/getFarmersProfile").then((data) => {
    //spinner.stop();
      console.log(data);
    element.remove();

    drawMarkers(data);
  });
}

init();

function drawMarkers(d) {
  var data = JSON.parse(d);

 // console.log(data);
  var trans = data.features.map((sa) => {
    return sa.properties.Txns;
  });
    //console.log(trans)
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
          Id: d.Id,
         
          Name: attributes.Name, AgeGroup: attributes.AgeGroup,
          Phone: attributes.Phone,
          Vcgroup : attributes.Vcgroup,

      SubCounty: attributes.SubCounty,
      Ward: attributes.Ward,
          Category: d.Category,
      AmtofMilkdp: d.AmtofMilkdp,
          Breed: d.Breed, Age: d.Age,
      BreedGender: d.BreedGender,
     
     
      Produce: d.Produce,
      Quantity: d.Quantity,
          Revenue: d.Revenue,
          UpdateTime: d.UpdateTime,
      TransactionsId: d.TransactionsId,
      
    });
  });

  const xf = crossfilter(dataP);
  //console.log(dataP);
  //console.log(dataP);
  var groupname = "marker-select";
  var farmersDim = xf.dimension(function (d) {
    return d.TransactionsId;
  });
    // wil not filter the map
  var farmersDimGrp = farmersDim.group().reduce(
    (p, v) => {
      ++p.count;
      p.Name = v.Name;
      p.Phone = v.Phone;
      p.Ward = v.Ward;

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

    var facilities = xf.dimension(function (d) {
        return d.TransactionsId;
    });
    var facilitiesGroup = facilities.group();
    var choro = dc_leaflet
        .markerChart(".map", groupname)
        .dimension(facilities)
        .group(facilitiesGroup)
        //.width(600)
        //.height(400)
        .center([-1.17315747054207, 36.7634069650127])
        .zoom(7)
        .cluster(true)
        .locationAccessor(function (d) {
            var tempcoordinates = pos[d.key];
            //console.log(tempcoordinates);
            return tempcoordinates.reverse();
        })
        .popup((d) => {
            var result = dataP.filter((obj) => obj.TransactionsId === d.key)[0];
            //console.log(result);
            popupContent = "";
            popupContent +=
                '<ul style="list-style-type:none;padding-inline-start: 5px !important;>' +
                '<li><span class="attribute">' +
                "Name :" +
                '<span class="label" style="color: #000000">' +
                result.Name +
                "</span></span></li>" +
                ' <li><span class="attribute">' +
                "Phone :" +
                '<span class="label" style="color: #000000">' +
                result.Phone +
                "</span></span></li>" +
                ' <li><span class="attribute">' +
                "Ward :" +
                '<span class="label" style="color: #000000">' +
                result.Ward +
                "</span></span></l> " +
                "</ul>";
            popupContent = '<div class="map-popup">' + popupContent + "</div>";
            //console.log(popupContent);
            return popupContent;
        });

  var types = xf.dimension((d) => d.Breed);

  var typesGroup = types.group().reduceSum(d=>d.Quantity);

  var pie = dc
    .pieChart(".pie", groupname)
    .dimension(types)
    .group(typesGroup)
    .width(125)
    .height(125)
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
    .reduceSum((d) => d.Quantity);

  const rowChartAgriactivities = dc
    .rowChart(".rowChart",groupname)
    .dimension(farmProduceDim)
    .group(farmProduceDimGrp)
    .height(500)
    .width(250)
    .elasticX(true)
    .transitionDuration(1500)
    .xAxis()
    .ticks(5);

  const farmer = xf.dimension((d) => d.TransactionsId);

  const nasdaqTable = dc
    .dataTable(".dc-data-table",groupname)
    .dimension(farmer)
    .group((d) => {
      return "";
    })
    .size(14)
    .columns(["Category", "Produce", "Quantity"])
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
    
    .height(110)
    .transitionDuration(1500)
    .renderLabel(true)
    .renderTitle(true)
    .ordering(function (p) {
      return -p.value;
    });

  const nasdaqCount = dc
    .dataCount(".dc-data-count",groupname)
    .crossfilter(xf)
    .group(all);

    const QtyDim = xf.dimension((d) => d.Vcgroup);
    const QtyDimGrp = QtyDim.group().reduceCount();
    var qtyChart = dc
        .pieChart(".qtyChart", groupname)
        .dimension(QtyDim)
        .group(QtyDimGrp)
        .width(125)
        .height(125)
        .renderLabel(true)
        .renderTitle(true)
        .radius(80)
        .ordering(function (p) {
            return -p.value;
        });
   const revDimension = xf.dimension((d) => d.Category);
  const revDimensionGrp = revDimension.group().reduceSum(d=> Math.floor(d.Quantity/1000));
  const revrowChart = dc
    .rowChart(".revrowChart",groupname)
    
    .height(130)
    .x(d3.scaleLinear().domain([6, 20]))
    .elasticX(true)
    .dimension(revDimension)
    .group(revDimensionGrp)
    .xAxis()
    .ticks(5);

    d3.select('#download')
        .on('click', function () {
            var data = farmersDim.top(Infinity);
            if (d3.select('#download-type input:checked').node().value === '.dc-data-table') {
                data = data.sort(function (a, b) {
                    return table.order()(table.sortBy()(a), table.sortBy()(b));
                });
                data = data.map(function (d) {
                    var row = {};
                    table.columns().forEach(function (c) {
                        row[table._doColumnHeaderFormat(c)] = table._doColumnValueFormat(c, d);
                    });
                    return row;
                });
            }
            var blob = new Blob([d3.csvFormat(data)], { type: "text/csv;charset=utf-8" });
            saveAs(blob, 'farmers_data.csv');
        });
  dc.renderAll(groupname);

  return {
      choro: choro,
    pie: pie,
    //rowChartAgriactivities: rowChartAgriactivities,
    //revrowChart: revrowChart,
    //qtyChart: qtyChart,
    //revenuePie: revenuePie,
  };
}
