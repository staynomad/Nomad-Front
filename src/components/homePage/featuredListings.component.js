import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ListingCard from "../matches/listing/listingCard.component";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { getPopularListings } from "../../redux/actions/searchListingActions";
import "./featuredListing.css";

const FeaturedListings = (props) => {
  useEffect(() => {
    const getData = async () => {
      await props.getPopularListings(10);
    };
    getData();
  }, []);

  return (
    <div className="featured-listings-container">
      {props.Listing.popularListings !== undefined ? (
        <ScrollMenu
          data={props.Listing.popularListings.map((listing) => (
            <ListingCard listing={listing} key={listing._id} />
          ))}
          wheel={false}
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
