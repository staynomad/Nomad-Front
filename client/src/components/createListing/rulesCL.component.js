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
          <div className="startText">rules</div>
          <br />
          <div className="questionText">you're almost there!</div>
          <br />
          <input
            type="text"
            name="rules"
            className="textInputBox"
            value={this.state.rules}
            placeholder="rules"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
