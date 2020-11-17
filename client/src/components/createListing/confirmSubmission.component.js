import React, { Component } from "react";
export default class ConfirmSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = props.handle;
  }
  /*
  componentDidMount() {
    let temp = "";
    temp =
      this.state.location.street +
      "\n" +
      this.state.location.state +
      ", " +
      " " +
      this.state.location.zipcode +
      "apt num" +
      this.state.location.aptnum;
    this.setState({
      completeAddress: temp,
    });
  }*/
  render() {
    return (
      <div>
        <h1>Check your information</h1>
        <div>
          <h2>your address</h2>
          <p>{this.state.location.street}</p>
          <h2>the description you gave</h2>
          <p>{this.state.description}</p>
          <h2>details about your home</h2>
          <p>{this.state.details.baths} bath/s</p>
          <p>{this.state.details.beds} bed/s</p>
          <p>you will receive {this.state.price} per night</p>
          <h2>your listing will be within these dates</h2>
          <p>{this.state.dates.start_date.toLocaleDateString()}</p>
          <h2>these are the rules you have detailed</h2>
          <p>{this.state.rules}</p>
        </div>
      </div>
    );
  }
}

/*
location: {},
      description: "",
      details: {},
      price: 0,
      rules: "",
      dates: {},
*/
