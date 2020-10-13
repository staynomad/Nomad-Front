import React, { useState, useEffect } from "react";
import handleReq from "../../utils/fetchRequest";
import "./listings.css";
import {Modal, DialogContent} from '@material-ui/core/';
import ListingsModal from './listingsmodal.component';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpenClose = () => {
    setOpen(!open);
  };

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
        <div className='listing-item' onClick={handleOpenClose}>
          <div className='listing-information'>
            <div className='listing-image'>listing image here</div>
            <div>
              <b>{listing.description}</b>
            </div>
            <div>
              <b>Details:</b> {listing.details.beds > 1 ? `${listing.details.beds} beds` : `${listing.details.beds} bed`}  {listing.details.baths > 1 ? `${listing.details.baths} baths` : `${listing.details.baths} bath`}
            </div>
            <div>
              <b>Rating:</b> {listing.rating.user} / 5
            </div>
            <div>
              <b>Starting Price:</b> ${listing.price}
            </div>
          </div>
          <Modal open={open} onClose={handleOpenClose} >
            <DialogContent className="material-ui-modal">
              <ListingsModal listing={listing}/>
            </DialogContent>
          </Modal>
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
