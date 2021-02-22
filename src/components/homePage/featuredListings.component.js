import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { getPopularListings } from "../../redux/actions/searchListingActions";
import "./featuredListing.css";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HorizontalListingCard from "../matches/listing/HorizontalListingCard.component";

const FeaturedListings = (props) => {
  useEffect(() => {
    const getData = async () => {
      await props.getPopularListings(10);
    };
    getData();
  }, []);

  return (
    <div
      className="featured-listings-container wow fadeInUp"
      data-wow-delay="0.5s"
    >
      <div className="featured-listings-header">
        <h1>Featured Listings</h1>
        <div className="featured-listings-line"></div>
      </div>
      {props.Listing.popularListings !== undefined && (
        <ScrollMenu
          data={props.Listing.popularListings.map((listing) => (
            <HorizontalListingCard listing={listing} key={listing._id} />
          ))}
          wheel={false}
          arrowLeft={<ArrowBackIcon className="scroll-menu-arrow left" />}
          arrowRight={<ArrowForwardIcon className="scroll-menu-arrow right" />}
          translate={2}
        />
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
