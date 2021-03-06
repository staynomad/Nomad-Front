import React from "react";
import { NavLink } from "react-router-dom";

import guestImage from "../../../assets/img/guest.svg";
import bedImage from "../../../assets/img/bed.svg";
import bathImage from "../../../assets/img/bath.svg";

const HorizontalListingCard = ({ listing }) => {
  return (
    <NavLink to={"/listing/" + listing._id} className="horizontal-listing-card">
      <img
        src={
          listing.pictures.length < 1
            ? "/images/default_listing.jpg"
            : listing.pictures[0]
        }
        alt="cover"
      />
      <div className="horizontal-listing-card-content">
        <h3>{listing.title}</h3>
        <div className="horizontal-listing-card-details-container">
          <div>
            <img src={guestImage} alt="guest" />
            <h4>{`${listing.details.maxpeople} Guest${
              listing.details.maxpeople === "1" ? "" : "s"
            }`}</h4>
          </div>
          <div>
            <img src={bedImage} alt="bed" />
            <h4>{`${listing.details.beds} Bed${
              listing.details.beds === "1" ? "" : "s"
            }`}</h4>
          </div>
          <div>
            <img src={bathImage} alt="bath" />
            <h4>{`${listing.details.baths} Bath${
              listing.details.baths === "1" ? "" : "s"
            }`}</h4>
          </div>
        </div>
        <h2>
          ${listing.price} <span> / night</span>
        </h2>
      </div>
    </NavLink>
  );
};

export default HorizontalListingCard;
