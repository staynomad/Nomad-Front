import React, { useState } from "react";
import Roommates from "./roommates.component";
import Listings from "./listings.component";
import "./filter.css";

// export default class Filter extends Component {
const Filter = ({ toggle }) => {
  const [roommateView, setRoommateView] = useState(false);
  const [listingView, setListingView] = useState(false);

  return (
    <div id='filter-page'>
      <div className='modal-content filter-container'>
        <span className='close' onClick={toggle}>
          &times;{" "}
        </span>
        <div className='filter-choices'>
          <label>
            <input
              className='filter-checkbox'
              type='checkbox'
              id='roomates'
              onClick={() => setRoommateView(!roommateView)}
            />{" "}
            roommates
          </label>
          <label>
            <input
              className='filter-checkbox'
              type='checkbox'
              id='properties'
              onClick={() => setListingView(!listingView)}
            />{" "}
            properties
          </label>
          <select defaultValue={"nights"}>
            <option value='nights'>nights</option>
            <option>1-3</option>
            <option>3-7</option>
            <option>7+</option>
          </select>
        </div>
      </div>
      {roommateView ? <Roommates /> : null}
      {listingView ? <Listings /> : null}
    </div>
  );
};

export default Filter;
