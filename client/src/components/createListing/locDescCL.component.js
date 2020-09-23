import React, { Component } from "react";

export default class LocDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      description: "",
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
          <span>Where Is Your Home Located?</span>
          <br />
          <input
            type="text"
            name="location"
            value={this.state.location}
            placeholder="Address"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <span>Give a brief description of your property</span>
          <br />
          <input
            type="text"
            name="description"
            value={this.state.description}
            placeholder="Description"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
