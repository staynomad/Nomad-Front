import React, { Component } from "react";
import "./createListing.css";
export default class DatesCL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: "",
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
          <div className="questionText">When is it available?</div>
          <br />
          <input
            type="text"
            className="textInputBox"
            name="dates"
            value={this.state.dates}
            placeholder="dates"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
