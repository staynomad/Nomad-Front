import React, { Component } from "react";
import "./createListing.css";

export default class LocDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      description: "",
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
      <div className="locDescForm">
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

        <div>
          <div className="questionText">Tell us about your property</div>
          <br />
          <input
            type="text"
            name="description"
            className="textInputBox"
            value={this.state.description}
            placeholder="Description"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
