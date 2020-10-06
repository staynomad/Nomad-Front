import React, { useState, useEffect } from "react";
import handleReq from "../../utils/fetchRequest";
import "./listings.css";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // setListings([{ name: "100 Acre Room" }]);
    handleReq("/listings", "GET")
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        if (res.errors) {
          alert(res.errors[0]);
        }
        console.log(res.body);
        if (res.body) {
          setListings(res.body);
        }
      });
  }, []);

  return (
    <div id='listing-content'>
      {listings.map((listing) => (
        <div className='listing-item'>
          <div className='listing-information'>
            <div className='listing-image'>listing image here</div>
            <div>
              <b>{listing.description}</b>
            </div>
            <div>
              <b>Details:</b> {listing.details.beds} {listing.details.baths}{" "}
              {listing.details.maxpeople}
            </div>
            <div>
              <b>Rating:</b> {listing.rating.user}
            </div>
            <div>
              <b>Price:</b> {listing.price}
            </div>
          </div>
          <div>
            <button>More</button>
          </div>
        </div>
      ))}
      {/* can be refactored to another reusable component */}
      {/* more button directs to the all the listing information */}
    </div>
  );
};

export default Listings;
