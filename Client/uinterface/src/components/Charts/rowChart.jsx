import React from "react";
import * as dc from "dc";
import { css } from "glamor";
import { ChartTemplate } from "../ChartTemplate";
import { lab } from "d3";

const farmProduce = (refDiv, ndx) => {
  const dimension = ndx.dimension(
    (d) => d.properties.Txns.map((r) => r.Produce),
    true
  );
  const grp = dimension.group();
  // .reduceSum((d) => d.properties.Txns.map((r) => r.Quantity), true);

  const farmProduce = dc.rowChart(refDiv);
  farmProduce
    .dimension(dimension)
    .group(grp)
    .height(200)
    .cap(5)
    .elasticX(true)
    .transitionDuration(1500)
    .xAxis()
    .ticks(5);

  return farmProduce;
};

export const FarmProduce = (props) => (
  <ChartTemplate chartFunc={farmProduce} title="Farm Produce" />
);
