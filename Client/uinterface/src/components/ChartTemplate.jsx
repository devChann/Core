import React, { useEffect, useState, useContext, useRef } from "react";
import { CXContext } from "./dataContex";
import * as dc from "dc";
import * as dc_leaflet from "dc.leaflet";
import { rhythm } from "../js/typography";
import { css } from "glamor";

const ResetButton = (props) => {
  const style = css({
    padding: rhythm(0.1),
    display: "inline",
    cusor: "pointer",
    float: "right",
    "&:hover": { background: "#dddddd" },
  });
  return (
    <span
      {...style} // apply the styling attribute to the span element
      onClick={() => {
        props.chart.FilterAll();
        dc.redrawAll();
      }}
    >
      Reset
    </span>
  );
};

export const ChartTemplate = (props) => {
  const context = useContext(CXContext);
  const [chart, setChart] = useState(null);
  const groupname = "marker-select";
  const ndx = context.ndx;
  const div = useRef(null); // reference a dom element without triggering react change detection to re-render
  useEffect(() => {
    const newChart = props.chartFunc(div.current, ndx); // chart function take div

    newChart.render();
    setChart(newChart);
  }, [1]); // run this only once
  const chartStyle = css({
    width: "100%",
    height: "auto",
    boxSizing: "border-box",
    padding: rhythm(1),
    "& lable": {
      textTransform: "capitalize",
      textDecoration: "underline",
    },
  });

  return (
    <div ref={div} {...chartStyle}>
      <ResetButton chart={chart} />
      <label>{props.title}</label>
    </div>
  );
};
