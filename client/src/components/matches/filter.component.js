import React, { useState } from "react";
import Roommates from "./roommate/roommates.component";
import Listings from "./listing/listings.component"
import "./filter.css";

// export default class Filter extends Component {
const Filter = ({ toggle, roommateView, listingView }) => {
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
        />
        Listing Checkbox 1
      </label>
      <label>
        <input
          className="filter-choices"
          type="checkbox"
        />
        Listing Checkbox 2
      </label>
      <label>
        <input
          className="filter-choices"
          type="checkbox"
        />
        Listing Checkbox 3
      </label>
      <select defaultValue={"nights"}>
            <option value='nights'>nights</option>
            <option>1-3</option>
            <option>3-7</option>
            <option>7+</option>
          </select>
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
