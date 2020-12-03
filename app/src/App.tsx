import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

import ShortenRoute from "./components/ShortenRoute";
import Toggler from "./components/Toggler";
import ShortenForm from "./components/ShortenForm";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <Toggler></Toggler>

        <div id="alert-wrapper"></div>
        <div className="container">
          <Switch>
            <Route path="/link/">
              <ShortenRoute></ShortenRoute>
            </Route>

            <Route exact path="/">
              <ShortenForm></ShortenForm>
            </Route>

            <Route component={NotFound} />
          </Switch>
        </div>

        <footer className="invert">
          <p className="footer-text">
            <a target="_blank" href="https://www.ablin.dev">
              @ablin42
            </a>
          </p>
        </footer>
      </Router>
    );
  }
}

export default App;
