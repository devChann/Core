﻿//global  variables

var chartConfig = {
  target: "spinx",
};

var target = document.getElementById(chartConfig.target);
function init() {

  var element = lv.create(document.getElementById(chartConfig.target));

  d3.json("Home/getFarmersProfile").then((data) => {
    
    element.hide();

    drawMarkers(data);
  });
}

init();

function drawMarkers(d) {
  var data = JSON.parse(d);

 
  var trans = data.features.map((sa) => {
    return sa.properties;
  });

  var dataP = [];
  var pos = {};
    trans.forEach(function (d) {

        var geo = data.features.find((f) => f.properties.Id === d.Id);

         //console.log(geo);
        var points = geo.geometry.coordinates;

        var attributes = geo.properties;

        pos[d.Id] = points;

      //dataP.push({
      //    Id: d.Id,
      //    Name: attributes.Name, AgeGroup: attributes.AgeGroup,
      //    Phone: attributes.Phone,
      //    "Projects": attributes.Vcgroup,
      //    "IDNO": attributes.SubCounty,
      //    Ward: attributes.Ward,
      //    "CIG": attributes.C302,
      //    "Sub_Counties": attributes.C11501,
      //    "POS": attributes.C11301,
      //    Category: d.Category,
      //    //AmtofMilkdp: d.AmtofMilkdp,
      //    Breed: d.Breed, Age: d.Age,
      //    BreedGender: d.BreedGender,
      //    Produce: d.Produce,
      //    Quantity: d.Quantity,
      //    //Revenue: d.Revenue,
      //    "Date": d.UpdateTime,
      //    TransactionsId: d.TransactionsId,
      //    "Long": attributes.Long,
      //    "Lat": attributes.Lat
      
    });
  
    
    const xf = crossfilter(trans);
    const all = xf.groupAll();

  var groupname = "marker-select";
  var farmersDim = xf.dimension(function (d) {
    return d.Id;
  });
    // will not filter the map: used for test
  var farmersDimGrp = farmersDim.group().reduce(
    (p, v) => {
          ++p.count;
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

    var farmers = xf.dimension(function (d) {
        return d.Id;
    });
    var farmersGroup = farmers.group();
    var choro = dc_leaflet
        .markerChart(".map", groupname)
        .dimension(farmers)
        .group(farmersGroup)
       
        .center([-1.17315747054207, 36.7634069650127])
        .zoom(10)
        .cluster(true)
        .locationAccessor(function (d) {
            var tempcoordinates = pos[d.key];
            console.log(tempcoordinates);
            return tempcoordinates;
        })
        .popup((d) => {
            var result = trans.filter((obj) => obj.Id === d.key)[0];
           //console.log(result)
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
           
            return popupContent;
        });

    
    

  var types = xf.dimension((d) => d.Category);

  var typesGroup = types.group().reduceSum(d=>d.Qty);

  var pie = dc
    .pieChart(".pie", groupname)
    .dimension(types)
    .group(typesGroup)
    .width(120)
    .height(120)
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
    const farmProduceDim = xf.dimension((d) => d.ValueChain);
  const farmProduceDimGrp = farmProduceDim
    .group()
      .reduceSum(d => Math.floor(d.Qty));

  const rowChartAgriactivities = dc
    .rowChart(".rowChart",groupname)
    .dimension(farmProduceDim)
    .group(farmProduceDimGrp)
    .height(250)
    .width(270)
    .elasticX(true)
    .transitionDuration(1500)
    .cap(18)
    //.xAxis()
    
    //.ticks(5);
    rowChartAgriactivities.xAxis().ticks(5);

  const farmer = xf.dimension((d) => d.Id);

  const nasdaqTable = dc
    .dataTable(".dc-data-table",groupname)
    .dimension(farmer)
    .group((d) => {
      return "";
    })
    .size(5)
    .columns(["Category", "Qty"])
    .order(d3.ascending)
    .on("renderlet", function (table) {
      table.selectAll(".dc-table-group").classed("info", true);
    });

  

 
  const nasdaqCount = dc
    .dataCount(".dc-data-count",groupname)
    .crossfilter(xf)
        .group(all);
    const totalnumberoffarmers = farmers.group();
    //var allfarms = totalnumberoffarmers.groupAll();

    const totalfarmers = dc.numberDisplay('.numbers', groupname)
        .group({
            value: function () {

                return totalnumberoffarmers.all().filter(function (kv) { return kv.value > 0 }).length;
            }
        })
        .formatNumber(d3.format(".3s"))
        .valueAccessor(function (d) {
           // console(d.length)
            return d
        })

    const QtyDim = xf.dimension((d) => d.Variety);
    const QtyDimGrp = QtyDim.group().reduceCount();
    var qtyChart = dc
        .pieChart(".qtyChart", groupname)
        .dimension(QtyDim)
        .group(QtyDimGrp)
        .width(120)
        .height(120)
        .renderLabel(true)
        .renderTitle(true)
        .radius(80)
      
        .ordering(function (p) {
            return -p.value;
        });

   const revDimension = xf.dimension((d) => d.Category);
    const revDimensionGrp = revDimension.group().reduceSum(d => d.Acreage);
  const revrowChart = dc
    .rowChart(".revrowChart",groupname)
    
      .height(165)
      .width(250)
    .x(d3.scaleLinear().domain([6, 20]))
    .elasticX(true)
    .dimension(revDimension)
    .group(revDimensionGrp)
    .xAxis()
    .ticks(3);


    var cigsDim = xf.dimension(d => d.Cig)
    var cigsSelect = dc.selectMenu('#cigs', groupname)
        .dimension(cigsDim)
        .group(cigsDim.group())
        .controlsUseVisibility(true);

    var subCountiesDim = xf.dimension(d => d.Ward)
    var subCounties = dc.selectMenu('#subcounties', groupname)
        .dimension(subCountiesDim)
        .group(subCountiesDim.group())
        .controlsUseVisibility(true);

    var POSCountiesDim = xf.dimension(d => d.Ward)
    var POSCounties= dc.selectMenu('#pos', groupname)
        .dimension(POSCountiesDim)
        .group(POSCountiesDim.group())
        .controlsUseVisibility(true);

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
   
  };
}
