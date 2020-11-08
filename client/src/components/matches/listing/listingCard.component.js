import React, {useState} from 'react';
import {Modal, DialogContent} from '@material-ui/core/';
import ListingsModal from './listingsmodal.component';

const ListingCard = ({listing}) => {
  const [open, setOpen] = useState(false);

  const handleOpenClose = () => {
    setOpen(!open);
  };

  return (
    <div className='listing-item' onClick={handleOpenClose}>
      <a href={'/listing/' + listing._id}>
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
        </a>
    </div>
  )
};

export default ListingCard;
