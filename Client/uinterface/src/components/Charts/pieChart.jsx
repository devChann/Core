import React from "react";
import * as dc from "dc";
import { css } from "glamor";
import { ChartTemplate } from "../ChartTemplate";
import { lab } from "d3";

const agriculturalActivitiesChartFunc = (refDiv, ndx) => {
  const dimtxns = ndx.dimension(
    (d) => d.properties.Txns.map((r) => r.Category),
    true
  );

  const catDim = ndx.dimension((d) => {
    return d.Category;
  });
  const catDimgrp = dimtxns.group();
  var all = dimtxns.groupAll();

  const agriActivities = dc.pieChart(refDiv);
  agriActivities
    .dimension(dimtxns)
    .group(catDimgrp)
    .height(200)
    .width(200)
    .label(function (d) {
      if (agriActivities.hasFilter() && !agriActivities.hasFilter(d.key)) {
        return d.key + "(0%)";
      }
      var label = "";
      if (all.value()) {
        label += "(" + Math.floor((d.value / all.value()) * 100) + "%)";
      }
      return label;
    })
    .renderLabel(true)
    .innerRadius(5)
    .transitionDuration(500)
    // .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
    // .colorDomain([-1750, 1644])
    .colorAccessor((d) => d.value);
  return agriActivities;
};

export const AgriculturalActivitiesChartFunc = (props) => (
  <ChartTemplate
    chartFunc={agriculturalActivitiesChartFunc}
    title="Farm Activities"
  />
);
