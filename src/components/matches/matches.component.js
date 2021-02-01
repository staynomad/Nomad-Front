import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Filter from "./filter.component";
import Roommates from "./roommate/roommates.component";
import Listings from "./listing/listings.component";
import Search from "../homePage/search.component";
import "./matches.css";
import "./listing/explore.css";

const Matches = (props) => {
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
    if (location.search) setListingView(true);
  }, [location.search]);

  return (
    <div id="matches-page">
      <div className="spacer_l"></div>
      <div className="spacer_xl"></div>
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
      <div className="spacer_s"> </div>
      <div className="wow fadeInUp" data-wow-delay="0.5s">
        <Search history={history} />
        <div className="click-for-more">
          Click on a listing to see more information!
        </div>
        {/*<button className="filter btn green" onClick={() => {
          setRoommateView(!roommateView);
          setListingView(false)
        }}>
          roommates
        </button>
        <button
          className="filter btn green locations"
          onClick={() => {
            setListingView(!listingView);
            setRoommateView(false);
          }}
        >
          listings
        </button>*/}
        {/*<button className="filter btn green" onClick={toggle}>
          filter
        </button>*/}
      </div>
      <div id="matches-components-filtering">
        <div id="filtering-inputs">
          {!seen || (!roommateView && !listingView) ? null : (
            <Filter
              toggle={toggle}
              roommateView={roommateView}
              listingView={listingView}
              listingFilterState={listingFilterState}
              setListingFilterState={setListingFilterState}
            />
          )}
        </div>
        <div id="roommate-listing-content-container">
          {roommateView ? <Roommates /> : null}
          {listingView ? (
            <Listings listingFilterState={listingFilterState} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Matches);
