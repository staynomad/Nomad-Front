import React, { Component } from "react";
import "./createListing.css";
export default class PricesCL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
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
          <div className="questionText">How much are you listing for?</div>
          <br />
          <input
            type="text"
            name="price"
            className="textInputBox"
            value={this.state.price}
            placeholder="price"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
