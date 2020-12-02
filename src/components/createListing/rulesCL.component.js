import React, { Component } from "react";
import "./createListing.css";
export default class RulesCL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: "",
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
        <div>
          <div className="startText">Rules</div>
          <br />
          <div className="questionText">Add any rules here! (optional)</div>
          <br />
          <textarea
            type="text"
            name="rules"
            className="textInputBox"
            value={this.state.rules}
            placeholder="rules"
            onChange={this.handleChange}
          ></textarea>
        </div>
      </div>
    );
  }
}
