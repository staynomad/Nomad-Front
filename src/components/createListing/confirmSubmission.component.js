import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./createListing.css";
class ConfirmSubmission extends Component {
  render() {
    const start = new Date(this.props.data.dates.start_date)
    const end = new Date(this.props.data.dates.end_date)
    return (
      <div>
        <h1>Review Your Listing</h1>
        <div className="spacer_s"></div>
        <div className="confirm-container">
          <h2 className="header-text">Title</h2>
          <p className="confirm-text">{this.props.data.title}</p>

          <h2 className="header-text">Address</h2>
          <p className="confirm-text">
            <span>Street: </span>
            {this.props.data.location.street} <br />
            <span>City: </span>
            {this.props.data.location.city} <br />
            <span>State: </span>
            {this.props.data.location.state} <br />
            <span>Country: </span>
            {this.props.data.location.country} <br />
            <span>Zipcode: </span>
            {this.props.data.location.zipcode} <br />
          </p>

          <h2 className="header-text">Description</h2>
          <p className="confirm-text">{this.props.data.description}</p>

          <h2 className="header-text">Details</h2>
          <p className="confirm-text">
            <span>Beds:</span> {this.props.data.details.beds} <br />
            <span>Baths:</span> {this.props.data.details.baths} <br />
            <span>Max people:</span> {this.props.data.details.maxpeople} <br />
          </p>

          <h2 className="header-text">Price</h2>
          <p className="confirm-text">${parseFloat(this.props.data.price).toFixed(2)} per night</p>
          <p className="confirm-text">${(this.props.data.price * .1).toFixed(2)} tax</p>

          <h2 className="header-text">Dates</h2>
          <p className="confirm-text">
            <span>Start date: </span>
            {start.toLocaleDateString()} <br />
            <span>End date: </span>
            {end.toLocaleDateString()} <br />
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.CreateListing,
  };
};

export default withRouter(connect(mapStateToProps, null)(ConfirmSubmission));
//{this.props.data.dates.end_date.toLocaleDateString()}
