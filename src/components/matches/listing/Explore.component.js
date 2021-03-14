import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Filter from "../filter.component";
import Roommates from "../roommate/roommates.component";
import Listings from "../listing/listings.component";
import Search from "../../homePage/search.component";
import "../allListings.css";
import "../listing/explore.css";
import FeaturedListings from "../../homePage/featuredListings.component";

const AllListings = (props) => {
  const { history } = props;
  const [seen, setSeen] = useState(false);
  var roommateView = false;
  const [listingView, setListingView] = useState(true);
  // const [roommateFilters, setRoommateFilters] = useState({});
  const [listingFilterState, setListingFilterState] = useState({
    minRating: 0,
    minRatingClicked: false,
    startingPrice: 0,
    startingPriceClicked: false,
    minGuests: 1,
    minGuestsClicked: false,
  });
  // pass filter setters to filter component to update filter state
  // pass filter state to roommate and listing components to allow filtering through roommates/listing components

  const toggle = () => {
    if (roommateView || listingView) {
      setSeen(!seen);
    }
  };

  const { location } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.search) setListingView(true);
  }, [location.search]);

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
        <div className="featured-listings-matches-container">
          <FeaturedListings />
        </div>
      </div>
    </div>
  );
};

export default withRouter(AllListings);
