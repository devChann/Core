import React from "react";
import * as dc from "dc";
import { css } from "glamor";
import { ChartTemplate } from "../ChartTemplate";

const tableFunc = (refDiv, ndx) => {
  const nasdaq = dc.dataTable(refDiv);
  const dimension = ndx.dimension(
    (d) => d.properties.Txns.map((r) => r.id),
    true
  );
  const dimTop = dimension.top(Infinity);
  // sb = sdndx.dimension(d=>d.Txns.map(r=>r.Category),true);
  // const dimension = ndx.dimension((d) => {
  //   return d.id;
  // }); //accesing nested array

  nasdaq
    .dimension(dimension)

    .group(() => {
      return "";
    })

    .columns([
      "Id",
      "Category",
      "Produce",
      "Breed",
      "BreedGender",
      "Quantity",
      "Age",
      "Revenue",
    ])
    .sortBy(function (d) {
      return d.id;
    })
    .on("renderlet", function (table) {
      table.selectAll(".dc-table-group").classed("info", true);
    });

  return nasdaq;
};

const style = css({
  "& tr": {
    "& hover": {
      background: "#d6c3c3",
    },
  },
  "& td": {
    textAlign: "left",
    borderTop: "1px solid #dddd",
  },
});

export const DataTable = (props) => (
  <ChartTemplate chartFunc={tableFunc} style={style} title="Summary Table" />
);
