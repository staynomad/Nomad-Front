import React, { Component } from "react";
import Filter from "./filter.component";
import "./matches.css"

export default class Matches extends Component {
  constructor() {
    super();
    this.state = {
      seen: false
    }
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  toggleFilter() {
    this.setState({
      seen: !this.state.seen
    })
  }

  render() {
    return (
     <div>
      <div className="btn" onClick={this.toggleFilter}>
        <button>filter</button>
      </div>
      {this.state.seen ? <Filter toggle={this.toggleFilter} /> : null}
     </div>
    );
   }
}
