import React from "react";
import { NavLink } from "react-router-dom";

const HorizontalListingCard = ({ listing }) => {
  return (
    <NavLink to={"/listing/" + listing._id} className="horizontal-listing-card">
      <img
        src={
          listing.pictures.length < 1
            ? "/images/default_listing.jpg"
            : listing.pictures[0]
        }
        alt="cover-image"
      />
      <div className="horizontal-listing-card-content">
        <h3>{listing.title}</h3>
        <div className="horizontal-listing-card-details-container">
          <div>
            <img src="images/guest.svg" alt="guest" />
            <h4>{`${listing.details.maxpeople} Guest${
              listing.details.maxpeople == 1 ? "" : "s"
            }`}</h4>
          </div>
          <div>
            <img src="images/bed.svg" alt="bed" />
            <h4>{`${listing.details.beds} Bed${
              listing.details.beds == 1 ? "" : "s"
            }`}</h4>
          </div>
          <div>
            <img src="images/bath.svg" alt="bath" />
            <h4>{`${listing.details.baths} Bath${
              listing.details.baths == 1 ? "" : "s"
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
