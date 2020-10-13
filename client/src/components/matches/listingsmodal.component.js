import React from 'react';
import "./listingsmodal.css";

const ListingsModal = ({listing}) => {
  return (
    <div className="listings-modal">
      <h1>{listing.description}</h1>
      <div><b>Amenities</b>
        <div>{listing.amenities.pool ? `Pool` : null}</div>
        <div>{listing.amenities.gym ? `Gym` : null}</div>
        <div>{listing.amenities.tv ? `TV` : null}</div>
        <div>{listing.amenities.cooking_facilities ? `Kitchen` : null}</div>
      </div>
      <div><b>Details</b>
      <div>
        {listing.details.beds > 1 ? `${listing.details.beds} beds` : `${listing.details.beds} bed`}  {listing.details.baths > 1 ? `${listing.details.baths} baths` : `${listing.details.baths} bath`}
      </div>
      </div>
      <div><b>Location</b>
        <div>{listing.location.street}</div>
        <div>{listing.location.city}</div>
        <div>{listing.location.state}</div>
        <div>{listing.location.country}</div>
        <div>{listing.location.zipcode}</div>
      </div>
      <div><b>Starting price</b>
        <div>{listing.price}</div>
      </div>
      <div><b>Rating</b>
        <div>{listing.rating.user}</div>
      </div>
      <div><b>Rules</b>
        <div>{listing.rules}</div>
      </div>
    </div>
  )
};

export default ListingsModal;