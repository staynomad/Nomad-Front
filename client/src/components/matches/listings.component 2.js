import React, { useState, useEffect } from "react";
import handleReq from "../../utils/fetchRequest";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const headers = { Connection: "keep-alive" };
    handleReq("/listing", "GET", headers)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setListings(data.body);
      });
  }, []);

  return (
    <div>
      {listings.map((listing) => (
        <div>
          <div>Roommate: {listing.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Listings;