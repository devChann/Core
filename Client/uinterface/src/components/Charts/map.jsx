import React from "react";
import * as dc from "dc";
import { css } from "glamor";
import { ChartTemplate } from "../ChartTemplate";
import { lab } from "d3";
import * as dc_leaflet from "dc.leaflet";
import { chartRegistry } from "dc";
const markerChart = (refDiv, ndx, groupname) => {
  const marker = dc_leaflet.markerChart(refDiv);

  const geom = ndx.dimension((d) => d.geometry);
  geom.top(Infinity);
  const grp = geom.group();

  marker
    .dimension(geom)
    .group(grp)
    .width(600)
    .height(400)
    .center([36.66241538541946, -1.1261987118345946])
    .zoom(7)
    .cluster(true);
};

export const MarkersChart = () => <ChartTemplate chartFunc={markerChart} />;
