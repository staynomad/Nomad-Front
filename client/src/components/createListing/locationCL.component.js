import React, { Component } from "react";
import "./createListing.css";

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
    this.props.handle(value, name);
  }
  render() {
    return (
      <div className="LocationForm">
        <div>
          <div className="startText">Get started!</div>
          <br />
          <div className="questionText">Where Is Your Home Located?</div>
          <br />
          <input
            type="text"
            name="location"
            className="textInputBox"
            value={this.state.location}
            placeholder="Address"
            onChange={this.handleChange}
          />
        </div>
        <br />
      </div>
    );
  }
}
