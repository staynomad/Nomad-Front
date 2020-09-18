import React, { Component } from "react";
import Search from "./search.component";
import Navbar from "../general/navbar.component";
import Footer from "../general/footer.component";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div>
          <Search />
        </div>
        <Footer />
      </div>
    );
  }
}
