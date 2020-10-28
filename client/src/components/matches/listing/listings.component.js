import React, { useState, useEffect } from "react";
import handleReq from "../../../utils/fetchRequest";
import "./listings.css";
import ListingCard from './listingCard.component'

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    handleReq("/listings", "GET")
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        if (res.errors) {
          return alert(res.errors[0]);
        }

        if (res.body) {
          setListings(res.body);
        }
      });
  }, []);

  return (
    <div id='listing-content'>
      {listings.map((listing) => (
        <ListingCard listing={listing} />
      ))}
    </div>
  );
};

export default Listings;
