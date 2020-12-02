import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./createListing.css";
class ConfirmSubmission extends Component {
  render() {
    return (
      <div>
        <h1>Please Check your information</h1>
        <div className="confirm-container">
          <h2>Title</h2>
          <p className="confirm-text">{this.props.data.title}</p>
          <h2>Address</h2>
          <p>
            <span>Street: </span> {this.props.data.location.street}
          </p>
          <p>
            <span>City: </span>
            {this.props.data.location.city}
          </p>
          <p>
            <span>State: </span>
            {this.props.data.location.state}
          </p>
          <p>
            <span>Country: </span>
            {this.props.data.location.country}
          </p>
          <p>
            <span>Zipcode: </span>
            {this.props.data.location.zipcode}
          </p>

          <h2>description</h2>
          <p>{this.props.data.description}</p>
          <h2>details about your home</h2>
          <p>
            <span>Beds:</span> {this.props.data.details.beds}
          </p>
          <p>
            <span>Baths:</span> {this.props.data.details.baths}
          </p>
          <p>
            <span>Max people:</span> {this.props.data.details.maxpeople}
          </p>
          <h2>Price</h2>
          <p>${this.props.data.price} per night</p>
          <h2>Dates</h2>
          <p>
            <span>Start date: </span>
            {this.props.data.dates.start_date.toLocaleDateString()}
          </p>
          <p>
            <span>End date: </span>
            {this.props.data.dates.end_date.toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.CreateListing.state,
  };
};

export default withRouter(connect(mapStateToProps, null)(ConfirmSubmission));
//{this.props.data.dates.end_date.toLocaleDateString()}
