import React from "react";
import Home from "./components/homePage/home.component";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
//to add more items just copy the format and add the route path. look at navbar component to see where the path is currently set to
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
      </Router>
    </div>
  );
}

export default App;
