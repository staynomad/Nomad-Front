import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Search from "../../homePage/search.component";
import "../allListings.css";
import "../listing/explore.css";

import {
  getPopularListings,
  searchFilteredListings,
} from "../../../redux/actions/searchListingActions";

import HorizontalScrollMenu from "../../homePage/HorizontalScrollMenu.component";

const AllListings = (props) => {
  console.log(props.Listing);
  const { history } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      await props.getPopularListings(10);
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const stateToReturn = { ...state };
  stateToReturn["popularListings"] = state.Listing.popularListings;
  stateToReturn["exploreBudget"] = state.Listing.exploreBudget;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPopularListings: (count) => dispatch(getPopularListings(count)),
    searchFilteredListings: (filterState, explore) =>
      dispatch(searchFilteredListings(filterState, explore)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllListings)
);
