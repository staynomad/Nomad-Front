import React, { useState } from "react";
import Roommates from "./roommates.component";
import Listings from "./listings.component";
import "./matches.css";

// export default class Filter extends Component {
const Filter = ({ toggle }) => {
  const [roommateView, setRoommateView] = useState(false);
  const [listingView, setListingView] = useState(false);

  return (
    <div>
      <div className='modal_content filter_container'>
        <span className='close' onClick={toggle}>
          &times;{" "}
        </span>
        <div>
          <input
            type='checkbox'
            id='roomates'
            onClick={() => setRoommateView(!roommateView)}
          />{" "}
          roomates <br />
          <input
            type='checkbox'
            id='properties'
            onClick={() => setListingView(!listingView)}
          />{" "}
          properties <br />
          <select>
            <option selected>nights</option>
            <option>1-3</option>
            <option>3-7</option>
            <option>7+</option>
          </select>
        </div>
      </div>
      <div>{roommateView ? <Roommates /> : null}</div>
      <div>{listingView ? <Listings /> : null}</div>
    </div>
  );
};

export default Filter;
