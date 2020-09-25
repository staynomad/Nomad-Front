import React, { Component } from "react";

export default class Reservation extends Component {
  render() {
    return (
      <div>
        <div>
          <span>Find with reservation ID</span>
          <br />
          <input type="text" />
          <br />
          <input type="button" value="Find!" />
        </div>
      </div>
    );
  }
}
