import React, { Component } from "react";

export default class LocDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "tests",
      description: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.setState({
      location: "aaaa",
    });
  }
  render() {
    return (
      <div>
        <div>
          <span>Where Is Your Home Located?</span>
          <br />
          <input
            type="text"
            placeholder="Location"
            onChange={this.props.handler}
          />
        </div>
      </div>
    );
  }
}
