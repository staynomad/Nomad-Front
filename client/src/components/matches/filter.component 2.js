import React, { Component } from "react";
import "./matches.css"


export default class Filter extends Component {
  handleClick() {
   this.props.toggle();
  }

  render() {
    return (
     <div className="container">
       <div className="modal_content filter_container">
       <span className="close" onClick={this.handleClick}>&times;    </span>
       <div>
          <input type="checkbox" id="roomates" /> roomates <br />
          <input type="checkbox" id="properties" /> properties <br />
          <select>
            <option selected>nights</option>
            <option>1-3</option>
            <option>3-7</option>
            <option>7+</option>
          </select>
       </div>
      </div>
     </div>
    );
   }
}
