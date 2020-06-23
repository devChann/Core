import React from "react";
import * as dc from "dc";
import { css } from "glamor";
import { ChartTemplate } from "../ChartTemplate";
import { schemeRdYlGn, scaleLinear } from "d3";

const pdBubbleChart = (refDiv, ndx) => {
  const pdBubble = dc.bubbleChart(refDiv);
  const dimensions = ndx.dimension(
    (d) => properties.Txns.map((sa) => sa),
    true
  );
  // const dimension = ndx.dimension((d) => {
  //   return d.Produce;
  // });
  const grp = dimension.group().reduce(
    (p, v) => {
      ++p.count;
      p.Quantity += v.Quantity;
      p.Revenue += v.Revenue;
      return p;
    },
    (p, v) => {
      --p.count;
      p.Quantity -= v.Quantity;
      p.Revenue -= v.Revenue;
      return p;
    },
    () => ({
      count: 0,
      Quantity: 0,
      Revenue: 0,
    })
  );
  pdBubble
    .dimension(dimension)
    .group(grp)

    .transitionDuration(1500)
    .colors(schemeRdYlGn[9])
    .colorAccessor((p) => p.value.Quantity)
    .keyAccessor((p) => p.value.Revenue)
    .radiusValueAccessor((p) => p.value.count)
    .maxBubbleRelativeSize(0.3)
    .x(scaleLinear().domain([0, 35000]))
    .y(scaleLinear().domain([0, 45000]))
    .r(scaleLinear().domain([0, 2500]))
    .elasticY(true)
    .elasticX(true)
    .yAxisPadding(100)
    .xAxisPadding(500)
    .renderHorizontalGridLines(true)
    .renderVerticalGridLines(true)
    .xAxisLabel("Farm Produce")
    .renderLabel(true)
    .label((p) => p.key)
    .yAxis()
    .tickFormat((v) => `${v}`);
  return pdBubble;
};

export const PdBubbleChart = (props) => (
  <ChartTemplate chartFunc={pdBubbleChart} title="Farm Produce" />
);
