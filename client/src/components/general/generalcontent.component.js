import React, { Component } from "react";
import Navbar from "./navbar.component";
import Footer from "./footer.component";
//Calling on this folder from other folders to make the pages

export default class GeneralContent extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Footer />
      </div>
    );
  }
}
