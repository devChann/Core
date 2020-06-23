import React, { Component } from "react";
import Core from "./components/Core";
import { Grid } from "react-flexbox-grid";
import { css, style } from "glamor";
import { typography } from "./js/typography";

class App extends Component {
  render() {
    const style = css({
      backround: "#dddd",
    });
    typography.injectStyles();
    return (
      <div {...style}>
        <Grid>
          <Core />
        </Grid>
      </div>
    );
  }
}

export default App;
