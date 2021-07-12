import React from "react";
import Reservation from "./reservation/reservation.component";
import "./listingsmodal.css";

class ListingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.listing = this.props.listing;
  }

  render() {
    return (
      <div className="listing-modal">
        <h1>{this.listing.description}</h1>
        <div className="single-listing-info">
          <div className="single-listing-details">
            <div>
              <b>Amenities</b>
              <div>{this.listing.amenities.pool ? `Pool` : null}</div>
              <div>{this.listing.amenities.gym ? `Gym` : null}</div>
              <div>{this.listing.amenities.tv ? `TV` : null}</div>
              <div>
                {this.listing.amenities.cooking_facilities ? `Kitchen` : null}
              </div>
            </div>
            <div>
              <b>Details</b>
              <div>
                {this.listing.details.beds > 1
                  ? `${this.listing.details.beds} beds`
                  : `${this.listing.details.beds} bed`}{" "}
                {this.listing.details.baths > 1
                  ? `${this.listing.details.baths} baths`
                  : `${this.listing.details.baths} bath`}
              </div>
            </div>
            <div>
              <b>Address</b>
              <div>
                {this.listing.location.street} {this.listing.location.city},{" "}
                {this.listing.location.state}
              </div>
            </div>
            <div>
              <b>Price</b>
              <div>{this.listing.price}</div>
            </div>
            <div>
              <b>Rating</b>
              <div>{this.listing.rating.user}</div>
            </div>
            <div>
              <b>Rules</b>
              <div>{this.listing.rules}</div>
            </div>
            <Reservation />
          </div>
          <div className="single-listing-image"></div>
        </div>
      </div>
    );
  }
}

export default ListingsModal;
