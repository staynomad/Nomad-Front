import React, { Component } from "react";

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
          <span>When is it available?</span>
          <br />
          <input
            type="text"
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
