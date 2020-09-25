import React, { Component } from "react";
import Filter from "./filter.component";

export default class Matches extends Component {
  state = {
   seen: false
   };
  togglePop = () => {
   this.setState({
    seen: !this.state.seen
   });
  };

render() {
  return (
   <div>
    <div className="btn" onClick={this.togglePop}>
      <button>filter</button>
    </div>
    {this.state.seen ? <Filter toggle={this.togglePop} /> : null}
   </div>
  );
 }
}
