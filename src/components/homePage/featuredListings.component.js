import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { getPopularListings } from "../../redux/actions/searchListingActions";
import { NavLink } from "react-router-dom";

import "./featuredListing.css";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const FeaturedListings = (props) => {
  useEffect(() => {
    const getData = async () => {
      await props.getPopularListings(10);
    };
    getData();
  }, []);

  console.log(props.Listing.popularListings);

  return (
    <div
      className="featured-listings-container wow fadeInUp"
      data-wow-delay="0.5s"
    >
      <div className="featured-listings-header">
        <h1>Featured Listings</h1>
        <div className="featured-listings-line"></div>
      </div>
      {props.Listing.popularListings !== undefined ? (
        <ScrollMenu
          data={props.Listing.popularListings.map((listing) => (
            <NavLink
              to={"/listing/" + listing._id}
              className="horizontal-listing-card"
              key={listing._id}
            >
              <img
                src={
                  listing.pictures.length < 1
                    ? "/images/default_listing.jpg"
                    : listing.pictures[0]
                }
                alt="cover-image"
              />
              <div className="horizontal-listing-card-content">
                <h3>{listing.title}</h3>
                <div className="horizontal-listing-card-details-container">
                  <div>
                    <img src="images/guest.svg" alt="guest" />
                    <h4>{`${listing.details.maxpeople} Guest${
                      listing.details.maxpeople == 1 ? "" : "s"
                    }`}</h4>
                  </div>
                  <div>
                    <img src="images/bed.svg" alt="bed" />
                    <h4>{`${listing.details.beds} Bed${
                      listing.details.beds == 1 ? "" : "s"
                    }`}</h4>
                  </div>
                  <div>
                    <img src="images/bath.svg" alt="bath" />
                    <h4>{`${listing.details.baths} Bath${
                      listing.details.baths == 1 ? "" : "s"
                    }`}</h4>
                  </div>
                </div>
                <h2>
                  ${listing.price} <span> / night</span>
                </h2>
              </div>
            </NavLink>
          ))}
          wheel={false}
          arrowLeft={<ArrowBackIcon className="scroll-menu-arrow left" />}
          arrowRight={<ArrowForwardIcon className="scroll-menu-arrow right" />}
          translate={2}
        />
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const stateToReturn = { ...state };
  if (state.Listing.popularListings)
    stateToReturn["popularListings"] = state.Listing.popularListings;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPopularListings: (count) => dispatch(getPopularListings(count)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FeaturedListings)
);
