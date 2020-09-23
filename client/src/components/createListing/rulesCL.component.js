import React, { Component } from "react";

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
          <span>Any rules?</span>
          <br />
          <input
            type="text"
            name="rules"
            value={this.state.rules}
            placeholder="rules"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
