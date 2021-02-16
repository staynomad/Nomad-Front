import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./createListing.css";
class ConfirmSubmission extends Component {
  render() {
    const start = new Date(this.props.data.dates.start_date);
    const end = new Date(this.props.data.dates.end_date);

    return (
      <div>
        <h1 className="confirm-listing-header">Review Your Listing</h1>
        <div className="spacer_s"></div>
        <div className="confirm-container">
          <h2 className="confirm-listing-subtitle">Title</h2>
          <p className="confirm-listing-text">{this.props.data.title}</p>

          <h2 className="confirm-listing-subtitle">Address</h2>
          <p className="confirm-listing-text">
            <div className="confirm-listing-text-container">
              <span>Street: </span>
              {this.props.data.location.street}
            </div>
            <div className="confirm-listing-text-container">
              <span>City: </span>
              {this.props.data.location.city}
            </div>
            <div className="confirm-listing-text-container">
              <span>State: </span>
              {this.props.data.location.state}
            </div>
            <div className="confirm-listing-text-container">
              <span>Country: </span>
              {this.props.data.location.country}
            </div>
            <div className="confirm-listing-text-container">
              <span>Zipcode: </span>
              {this.props.data.location.zipcode}
            </div>
          </p>

          <h2 className="confirm-listing-subtitle">Description</h2>
          <p className="confirm-listing-text">{this.props.data.description}</p>

          <h2 className="confirm-listing-subtitle">Details</h2>
          <p className="confirm-listing-text">
            <div className="confirm-listing-text-container">
              <span>Beds:</span> {this.props.data.details.beds}{" "}
            </div>
            <div className="confirm-listing-text-container">
              <span>Baths:</span> {this.props.data.details.baths}{" "}
            </div>
            <div className="confirm-listing-text-container">
              <span>Max people:</span> {this.props.data.details.maxpeople}{" "}
            </div>
          </p>

          {this.props.data.amenities.length > 0 && (
            <>
              <h2 className="confirm-listing-subtitle">Amenities</h2>
              <p className="confirm-listing-text">
                {this.props.data.amenities.map((amenity) => {
                  return (
                    <div className="confirm-listing-text-container">
                      {amenity}
                    </div>
                  );
                })}
              </p>
            </>
          )}

          <h2 className="confirm-listing-subtitle">Price</h2>
          <p className="confirm-listing-text">
            ${parseFloat(this.props.data.price).toFixed(2)} / night
          </p>

          <h2 className="confirm-listing-subtitle">Dates</h2>
          <p className="confirm-listing-text dates">
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
