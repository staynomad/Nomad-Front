import React, { useState, useEffect } from "react";
import handleReq from "../../utils/fetchRequest";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    setListings([{ name: "100 Acre Room" }]);
  }, []);

  return (
    <div>
      {listings.map((listing) => (
        <div>Listing: {listing.name}</div>
      ))}
    </div>
  );
};

export default Listings;
