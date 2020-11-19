import React, { Component } from "react";
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";

import "./createListing.css";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      maxchars: 500,
      charleft: 500
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const newDesc = this.props.listingData.CreateListing.state.description
    const dif = this.state.maxchars - newDesc.length
    this.setState({
      description: newDesc,
      charleft: dif
    })
  }
  handleChange(e) {
    const { name, value } = e.target;
    const dif = this.state.maxchars - value.length;
    if (value.length <= this.state.maxchars ){
      this.setState({
        [name]: value,
        charleft: dif
      });
    }

    this.props.handle(value, name);
  }
  render() {
    return (
      <div>
        <div className="startText">Description</div>
        <br />
        <div className="questionText">Tell us the details about your property.</div>
        <br />
        <textarea
          type="text"
          name="description"
          className="descriptionTextInputBox"
          value={this.state.description}
          placeholder="Be detailed! The more information you include the greater the chance your property gets booked."
          onChange={this.handleChange}
          required
          ></textarea>
          <h3>{this.state.charleft} characters are left</h3>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    listingData: state
  }
}

export default withRouter(connect(mapStateToProps, null)(Description))
