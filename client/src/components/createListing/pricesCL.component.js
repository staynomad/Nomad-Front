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
    if (!isNaN(value)) {
      if (value < 1000) {
        this.setState({
          [name]: value,
        });
        this.props.handle(value, name);
      }
      
    }
  }
  render() {
    return (
      <div>
        <div>
          <div className="startText">Price</div>
          <br />
          <div className="questionText">How much are you listing for?</div>
          <br />
          <input
            type="text"
            name="price"
            className="priceInputBox"
            value={this.state.price}
            placeholder="$ per night"
            onChange={this.handleChange}
          />
          {this.state.price ? <p>List Price: ${this.state.price} per night</p>: ''}
          {this.state.price ? <p>After taxes and fees: ${this.state.price} per night</p>: ''}
        </div>
      </div>
    );
  }
}
