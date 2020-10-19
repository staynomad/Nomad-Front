import React, { useState } from "react";
import Filter from "./filter.component";
import Roommates from "./roommate/roommates.component";
import Listings from "./listing/listings.component"
import "./matches.css";

const Matches = () => {
  const [seen, setSeen] = useState(false);
  const [roommateView, setRoommateView] = useState(false);
  const [listingView, setListingView] = useState(false);

  const toggle = () => {
    if (roommateView || listingView) {
      setSeen(!seen);
    }
  };

  return (
    <div id='matches-page'>
      <div>
        <button className="filter btn green" onClick={() => {
          setRoommateView(!roommateView);
          setListingView(false)
        }}>
          People
        </button>
        <button className="filter btn green" onClick={() => {
          setListingView(!listingView);
          setRoommateView(false);
        }}>
          Listing
        </button>
        <button className='filter btn green' onClick={toggle}>
          filter
        </button>
        {!seen || !roommateView && !listingView ? null : <Filter toggle={toggle} roommateView={roommateView} listingView={listingView}/>}
      </div>
      <div>
        {roommateView ? <Roommates /> : null}
        {listingView ? <Listings /> : null}
      </div>
    </div>
  );
};

export default Matches;
