import React, { Component } from "react";
import "./reservation.css";
export default class Reservation extends Component {
  render() {
    return (
      <div className="full-reservation">
        <div className="reservation-id-finder">
          <div className="find-res-title">Reservation ID</div>
          <input className="res-id-input" type="text" />
          <br />
          <input className="res-find-but" type="button" value="Find!" />
        </div>
        <br />
        <div className="previous-res-finder">
          <div className="previous-rentals-title">
            Sign In to see your previous bookings
          </div>
          <div className="previous-rentals-list">old stuff</div>
        </div>
      </div>
    );
  }
}
//need to fetch from user things
