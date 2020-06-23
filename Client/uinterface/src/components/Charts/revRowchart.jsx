import React from "react";
import * as dc from "dc";
import { css } from "glamor";
import { ChartTemplate } from "../ChartTemplate";
import { lab } from "d3";

const revPerAgriActivities = (refDiv, ndx) => {
  const revChart = dc.rowChart(refDiv);

  const dimension = ndx.dimension(
    (d) => d.properties.Txns.map((r) => r.Category),
    true
  );
  const grp = dimension.group();
  // const dimension = ndx.dimension((d) => {
  //   return d.Category;
  // });
  // const grp = dimension.group().reduceSum((d) => {
  //   return d.Quantity;
  // });

  revChart.dimension(dimension).group(grp);
  return revChart;
};

export const RevPerAgriActivity = (props) => (
  <ChartTemplate chartFunc={revPerAgriActivities} title="Revenue" />
);
