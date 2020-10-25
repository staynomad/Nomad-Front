import React, { Component } from "react";
import "./createListing.css";

export default class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <div>
        <div className="startText">Description</div>
        <br />
        <div className="questionText">Tell us about your property.</div>
        <br />
        <textarea
          type="text"
          name="description"
          className="textInputBox"
          value={this.state.description}
          placeholder="e.g. this beautiful apartment overlooking a park"
          onChange={this.handleChange}
          ></textarea>
      </div>
    );
  }
}
