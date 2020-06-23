import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { DataTable } from "./Charts/nasdTable";
import { DataContext } from "./dataContex";
import { AgriculturalActivitiesChartFunc } from "./Charts/pieChart";
import { FarmProduce } from "./Charts/rowChart";
import { RevPerAgriActivity } from "./Charts/revRowchart";
import { MarkersChart } from "./Charts/map";
// import { PdBubbleChart } from "./Charts/pdBubbleChart";
// import { MapCluster } from "./MapClusters";
import { css } from "glamor";

const Core = (props) => {
  const style = css({
    padding: "0.5rem",
    marginTop: "1.5rem",
  });
  return (
    <div {...style}>
      <DataContext>
        {/* <Row>
          <Col md={12}>
            <PdBubbleChart />
          </Col>
        </Row> */}
        <Row>
          <Col md={7}>
            <Row>
              <Col md={12}>{<RevPerAgriActivity />}</Col>
            </Row>
            <Row>
              <Col md={6}>
                <AgriculturalActivitiesChartFunc />
                {/* <h5>Gain or Loss</h5> */}
              </Col>
              <Col md={6}>
                <FarmProduce />
                {/* <h5>FluctuationChart</h5> */}
              </Col>

              <Col md={6}>
                {/* <QuarterChart /> */}
                <h5>QuarterChart</h5>
              </Col>
              <Col md={6}>
                {/* <DayOfWeekChart /> */}
                <h5>DayOfWeekChart</h5>
              </Col>
            </Row>
          </Col>
          <Col md={5}>
            <MarkersChart />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <BubbleChart /> */}
            <div
              style={{ overflowY: "scroll", maxHeight: "40vh", width: "100%" }}
            >
              <DataTable />
            </div>
          </Col>
        </Row>
      </DataContext>
    </div>
  );
};

export default Core;
