import React, { Component } from "react";
import "./createListing.css";
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
          <div className="questionText">Details</div>

          <br />
          <input
            type="text"
            name="details"
            className="textInputBox"
            value={this.state.details}
            placeholder="Details"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
/*
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
*/
