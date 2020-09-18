import React from "react";
import Home from "./components/homePage/home.component";
import Contact from "./components/subpages/contact.component.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
//to add more items just copy the format and add the route path. look at navbar component to see where the path is currently set to
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        {/* <Switch>
          <Route path="/contact"> */}
        <Contact />
        {/* </Route> */}
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
