import React, { useState, useEffect } from "react";
import handleReq from "../../utils/fetchRequest";

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
    <div>
      {listings.map((listing) => (
        <div className='listing-item'>
          <div className='listing-information'>
            <div>Listing: {listing.description}</div>
            <div>
              Details: {listing.details.beds} {listing.details.baths}{" "}
              {listing.details.maxpeople}
            </div>
            <div>rating: {listing.rating.user}</div>
            <div>Price: {listing.price}</div>
          </div>
          <div>Click to see more!</div>
        </div>
      ))}
    </div>
  );
};

export default Listings;
