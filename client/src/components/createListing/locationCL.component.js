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
          <div className="startText">get started!</div>
          <br />
          <div className="questionText">where is your home located?</div>
          <br />
          <div className="listing-inputs">
            <div className="gen-subsec">
              <div className="label-text">street:</div>
              <input
                type="text"
                name="street"
                className="streetInputbox"
                value={this.state.street}
                placeholder="e.g. 5230 Newell Road"
                onChange={this.handleChange}
              />
            </div>
            <div className="gen-subsec">
              <div className="label-text">city:</div>
              <input
                type="text"
                name="city"
                className="cityInputBox"
                value={this.state.city}
                placeholder="Palo Alto"
                onChange={this.handleChange}
              />
            </div>
            <div className="state-country">
              <div className="state-subsec">
                <div className="label-text">state:</div>
                <input
                  type="text"
                  name="cstate"
                  className="stateInputBox"
                  value={this.state.cstate}
                  placeholder="CA"
                  onChange={this.handleChange}
                />
              </div>

              <div className="country-subsec">
                <div className="label-text">country:</div>
                <input
                  type="text"
                  name="country"
                  className="countryInputBox"
                  value={this.state.country}
                  placeholder="USA"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="gen-subsec">
              <div className="label-text">zipcode:</div>
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
              <div className="label-text">apartment:</div>
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
