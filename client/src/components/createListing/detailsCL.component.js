import React, { Component } from "react";

export default class DetailsCL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beds: "",
      baths: "",
      details: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    let temp = this.state.details + value;
    this.setState({
      [name]: temp,
    });
    this.props.handle(value, name);
  }
  render() {
    return (
      <div>
        <div>
          <span>Details</span>
          <br />
          <span>beds: </span>
          <input
            type="text"
            name="beds"
            value={this.state.beds}
            onChange={this.handleChange}
          />
          <br />
          <span>baths: </span>
          <input type="text" name="details" spec="baths" />
          <br />
          <input
            type="text"
            name="details"
            value={this.state.details}
            placeholder="Details"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
