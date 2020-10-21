import React, { useState } from "react";
import Filter from "./filter.component";
import Roommates from "./roommate/roommates.component";
import Listings from "./listing/listings.component"
import "./matches.css";

const Matches = () => {
  const [seen, setSeen] = useState(false);
  const [roommateView, setRoommateView] = useState(false);
  const [listingView, setListingView] = useState(false);
  const [roommateFilters, setRoommateFilters] = useState({});
  const [listingFilters, setListingFilter] = useState({});
  // pass filter setters to filter component to update filter state
  // pass filter state to roommate and listing components to allow filtering through roommates/listing components

  const toggle = () => {
    if (roommateView || listingView) {
      setSeen(!seen);
    }
  };

  return (
    <div id='matches-page'>
      <div className='container'>
        <button className="filter btn green" onClick={() => {
          setRoommateView(!roommateView);
          setListingView(false)
        }}>
          roommates
        </button>
        <button className="filter btn green locations" onClick={() => {
          setListingView(!listingView);
          setRoommateView(false);
        }}>
          locations
        </button>
        <button className='filter btn green' onClick={toggle}>
          filter
        </button>
      </div>
      <div id="matches-components-filtering">
        <div id="filtering-inputs">
          {!seen || (!roommateView && !listingView) ? null : <Filter toggle={toggle} roommateView={roommateView} listingView={listingView}/>}
        </div>
        <div id="roommate-listing-content-container">
          {roommateView ? <Roommates /> : null}
          {listingView ? <Listings /> : null}
        </div>
      </div>
    </div>
  );
};

export default Matches;
