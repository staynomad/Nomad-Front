import React, { Component } from "react";
import "./createListing.css";
import "./locationListing.css";
export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      city: "",
      cstate: "",
      country: "",
      zipcode: "",
      aptnum: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    if (isNaN(value) && name === "zipcode") {
      console.log("invalid input");
    } else {
      this.setState({
        [name]: value,
      });
    }

    this.props.handle(this.state, "location");
  }
  render() {
    return (
      <div className="LocationForm">
        <div>
          <div className="startText">Get Started!</div>
          <br />
          <div className="questionText">Where is your home located?</div>
          <br />
          <div className="listing-inputs">
            <div className="gen-subsec">
              <div className="label-text">Street:</div>
              <input
                type="text"
                name="street"
                className="streetInputbox"
                value={this.state.street}
                placeholder="5230 Newell Road"
                onChange={this.handleChange}
              />
            </div>
            <div className="gen-subsec">
              <div className="label-text">City:</div>
              <input
                type="text"
                name="city"
                className="cityInputBox"
                value={this.state.city}
                placeholder="Palo Alto"
                onChange={this.handleChange}
              />
            </div>

              <div className="gen-subsec">
                <div className="label-text">State:</div>
                <input
                  type="text"
                  name="cstate"
                  className="stateInputBox"
                  value={this.state.cstate}
                  placeholder="CA"
                  onChange={this.handleChange}
                />
              </div>

              <div className="gen-subsec">
                <div className="label-text">Country:</div>
                <input
                  type="text"
                  name="country"
                  className="countryInputBox"
                  value={this.state.country}
                  placeholder="USA"
                  onChange={this.handleChange}
                />
              </div>


            <div className="gen-subsec">
              <div className="label-text">Zipcode:</div>
              <input
                type="text"
                name="zipcode"
                className="zipInputBox"
                value={this.state.zipcode}
                placeholder="90201"
                onChange={this.handleChange}
              />
            </div>

            <div className="gen-subsec">
              <div className="label-text">Apartment:</div>
              <input
                type="text"
                name="aptnum"
                className="aptnumInputBox"
                value={this.state.aptnum}
                placeholder="aptnum"
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
