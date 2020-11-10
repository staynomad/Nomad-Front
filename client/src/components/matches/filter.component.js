import React, { useState } from "react";
import Roommates from "./roommate/roommates.component";
import Listings from "./listing/listings.component"
import NumericInput from 'react-numeric-input';
import "./filter.css";

// export default class Filter extends Component {
const Filter = ({ toggle, roommateView, listingView, listingFilterState, setListingFilterState }) => {

  const roommateFilters = (
    <div>
      <label>
        <input
          className="filter-choices"
          type="checkbox"
        />
        Roommate Checkbox 1
      </label>
      <label>
        <input
          className="filter-choices"
          type="checkbox"
        />
        Roommate Checkbox 2
      </label>
      <label>
        <input
          className="filter-choices"
          type="checkbox"
        />
        Roommate Checkbox 3
      </label>
    </div>
  );

  const listingFilters = (
    <div>
      <label>
        <input
          className="filter-choices"
          type="checkbox"
          onClick={() => setListingFilterState({...listingFilterState, minRatingClicked: !listingFilterState.minRatingClicked})}
        />
        Minimum Rating
      </label>
      <br />
      <NumericInput
        min={0}
        max={5}
        value={listingFilterState.minRating}
        step={0.1}
        onChange={valueAsNumber => setListingFilterState({...listingFilterState, minRating: valueAsNumber})}
      />
      <label>
        <input
          className="filter-choices"
          type="checkbox"
          onClick={() => setListingFilterState({...listingFilterState, startingPriceClicked: !listingFilterState.startingPriceClicked})}
        />
        Starting Price
      </label>
      <br />
      <NumericInput
        min={0}
        max={100}
        value={listingFilterState.startingPrice}
        step={5}
        onChange={valueAsNumber => setListingFilterState({...listingFilterState, startingPrice: valueAsNumber})}
      />
      <label>
        <input
          className="filter-choices"
          type="checkbox"
          onClick={() => setListingFilterState({...listingFilterState, maxGuestsClicked: !listingFilterState.maxGuestsClicked})}
        />
        Maximum Guests
      </label>
      <br />
      <NumericInput
        min={1}
        max={10}
        value={listingFilterState.maxGuests}
        step={1} 
        onChange={valueAsNumber => setListingFilterState({...listingFilterState, maxGuests: valueAsNumber})}
      />
      <label>
        <input 
          className="filter-choices"
          type="checkbox" 
          onClick={() => setListingFilterState({...listingFilterState, minStayClicked: !listingFilterState.minStayClicked})}
        />
        Minimum stay
      </label>
      <br />
      <NumericInput
        min={1}
        max={31}
        value={listingFilterState.minStay}
        step={1}
        onChange={valueAsNumber =>
          setListingFilterState ({...listingFilterState, minStay: valueAsNumber})}
      />
    </div>
  )

  return (
    <div id='filter-page'>
      <div className='modal-content filter-container'>
        <span className='close' onClick={toggle}>
          &times;{" "}
        </span>
        <div className='filter-choices'>
          {roommateView ? roommateFilters : null}
          {listingView ? listingFilters : null}
        </div>
      </div>
    </div>
  );
};

export default Filter;
