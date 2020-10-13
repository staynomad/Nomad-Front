import React from 'react';
import "./listingsmodal.css";

class ListingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.listing = props.listing;
  }
  render() {
    return (
      <div className="listing-modal">
        <h1>{this.listing.description}</h1>
        <div className="single-listing-info">
          <div className="single-listing-details">
            <div><b>Amenities</b>
              <div>{this.listing.amenities.pool ? `Pool` : null}</div>
              <div>{this.listing.amenities.gym ? `Gym` : null}</div>
              <div>{this.listing.amenities.tv ? `TV` : null}</div>
              <div>{this.listing.amenities.cooking_facilities ? `Kitchen` : null}</div>
            </div>
            <div><b>Details</b>
            <div>
              {this.listing.details.beds > 1 ? `${this.listing.details.beds} beds` : `${this.listing.details.beds} bed`}  {this.listing.details.baths > 1 ? `${this.listing.details.baths} baths` : `${this.listing.details.baths} bath`}
            </div>
            </div>
            <div><b>Location</b>
              <div>{this.listing.location.street}</div>
              <div>{this.listing.location.city}</div>
              <div>{this.listing.location.state}</div>
              <div>{this.listing.location.country}</div>
              <div>{this.listing.location.zipcode}</div>
            </div>
            <div><b>Starting price</b>
              <div>{this.listing.price}</div>
            </div>
            <div><b>Rating</b>
              <div>{this.listing.rating.user}</div>
            </div>
            <div><b>Rules</b>
              <div>{this.listing.rules}</div>
            </div>
          </div>
          <div className="single-listing-image">
          </div>
        </div>
      </div>
    )
  }
};

export default ListingsModal;