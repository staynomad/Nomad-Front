import React, { Component } from "react";

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
          <span>How much are you listing for?</span>
          <br />
          <input
            type="text"
            name="price"
            value={this.state.price}
            placeholder="price"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
