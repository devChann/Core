// Crossfilters and React component normally doesnt behave very well because they both manage state
// to avoid inconsistencies, we wrapp crossfilter inside context provider(refer to Redux documentation on content mgt)
// The main consideration is that data will probably be loaded asynchronously
// and that it may take some time for Crossfilter to process it.
// We don't want to render charts that depend on Crossfilter before we have it, and
// we don't want to trigger multiple renderings that may reinitialize charts or Crossfilter.
// We achieved this by holding Crossfilter as a property of the context component but outside
// of its state, and maintaining a flag in the context state indicating if we have the Crossfilter object.

import React, { Component, createContext } from "react";
import crossfilter from "crossfilter2";
export const CXContext = createContext("CXContext");

export class DataContext extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, hasNDX: false };
  }
  componentDidMount() {
    if (this.state.hasNDX) {
      return;
    }
    if (this.state.loading) {
      return;
    }
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        const jObject = JSON.parse(data);
        console.log(jObject);
        // this.createArrayFromGeoJson(jObject, (arr) => {
        //   console.log(arr);
        // });
        // var ndnd = crossfilter(jObject.features);
        // console.log(ndnd);
        // console.log(jObject);
        // const dataArray = jObject.features.map((sa) => {
        //   return sa.properties.Txns;
        // });
        // console.log(dataArray.flat());
        this.ndx = crossfilter(jObject.features);
        this.setState({
          loading: true,
          hasNDX: true,
        });
      });
  }
  render() {
    if (!this.state.hasNDX) {
      return null;
    }
    return (
      <CXContext.Provider value={{ ndx: this.ndx }}>
        <div ref={this.parent}>{this.props.children}</div>
      </CXContext.Provider>
    );
  }
}
