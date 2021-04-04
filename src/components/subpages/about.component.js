import React, { Component } from "react";
import "./aboutus.css";

export default class About extends Component {
  render() {
    return (
      <div className="aboutus-container">
        <h1>About Us</h1>
        <img
          src="/images/groupphoto.png"
          width="75%"
          height="75%"
          alt="Founding team"
        />

        <p>
          Our founder Mike Vilardo (second from right) knows the struggle of
          being a mom & pop property manager on Airbnb. Starting by renting out
          his patio at his Chicago home on Airbnb, Mike was able to scale up to
          managing several properties across a few major cities. He felt the
          pain of managing the day to day operations of the places, customer
          service, all the while having to market and acquire customers on
          Airbnb. This was all going ok until Covid-19 hit and the properties
          started to struggle. However, there was a silver lining as traveling
          nurses and emergency workers began to book longer term stays at Mike’s
          properties. At that moment, Mike and the team realized that there was
          something there, and that we should make affordable housing options
          available to all traveling workers on a budget for when they need it
          the most. Why just limit it to our own properties? This is when the
          NomΛd platform was born.
        </p>
      </div>
    );
  }
}
