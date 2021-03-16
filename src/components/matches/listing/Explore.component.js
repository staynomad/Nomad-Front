import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Search from "../../homePage/search.component";
import "../allListings.css";
import "../listing/explore.css";

import {
  getPopularListings,
  searchFilteredListings,
  getListingInRadius,
  searchAllListings,
} from "../../../redux/actions/searchListingActions";

import HorizontalScrollMenu from "../../homePage/HorizontalScrollMenu.component";

const AllListings = (props) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const { history } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        findLocationSuccess,
        findLocationFail
      );
    }

    const getData = async () => {
      await props.getPopularListings(10);
      await props.searchAllListings();
      await props.searchFilteredListings(
        {
          startingPriceClicked: true,
          startingPrice: 100,
        },
        true
      );
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getFurtherRadius = async () => {
      if (
        props.Listing.exploreNearYou &&
        props.Listing.exploreNearYou.length === 0
      ) {
        await props.getListingInRadius(lat, lng, 1000, true);
      }
    };
    getFurtherRadius();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.Listing.exploreNearYou]);

  const findLocationSuccess = async (position) => {
    const { latitude, longitude } = position.coords;
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
    await props.getListingInRadius(latitude, longitude, 100, true);
  };

  const findLocationFail = async (position) => {
    //LA Coords if the user denies location access
    if (position.code === 1) {
      await props.getListingInRadius(34.0522, -118.2437, 100, true);
    }
  };

  return (
    <div id="matches-page">
      <div className="spacer_l"></div>
      <div className="wow fadeInUp" data-wow-delay="0.4s">
        <div className="row gap large">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className=" wow fadeInUp" data-wow-delay="0.5s">
              <img
                src="images/banner.svg"
                alt="banner"
                className="banner center-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="wow fadeInUp" data-wow-delay="0.5s">
        <Search history={history} />
        <div className="click-for-more">
          Click on a listing to see more information!
        </div>
        <Link to="/listings" className="see-all-listings-btn">
          See all listings
        </Link>
        <div
          style={{ marginBottom: "3rem" }}
          className="featured-listings-matches-container"
        >
          <HorizontalScrollMenu
            data={props.Listing.popularListings}
            title="Featured Listings"
          />
        </div>
        <div
          style={{ marginBottom: "3rem" }}
          className="featured-listings-matches-container"
        >
          <HorizontalScrollMenu
            data={props.Listing.exploreBudget}
            title="Best Budget"
          />
        </div>
        <div
          style={{ marginBottom: "3rem" }}
          className="featured-listings-matches-container"
        >
          <HorizontalScrollMenu
            data={
              props.Listing.searchListings &&
              props.Listing.searchListings.slice(0, 10)
            }
            title="Recently Posted"
          />
        </div>
        <div
          style={{ marginBottom: "3rem" }}
          className="featured-listings-matches-container"
        >
          <HorizontalScrollMenu
            data={props.Listing.exploreNearYou}
            title="Near You"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const stateToReturn = { ...state };
  stateToReturn["popularListings"] = state.Listing.popularListings;
  stateToReturn["exploreBudget"] = state.Listing.exploreBudget;
  stateToReturn["exploreNearYou"] = state.Listing.exploreNearYou;
  stateToReturn["searchListings"] = state.Listing.searchListings;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPopularListings: (count) => dispatch(getPopularListings(count)),
    searchFilteredListings: (filterState, explore) =>
      dispatch(searchFilteredListings(filterState, explore)),
    getListingInRadius: (lat, lng, radius, explore) =>
      dispatch(getListingInRadius(lat, lng, radius, explore)),
    searchAllListings: () => dispatch(searchAllListings()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllListings)
);
