import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ReservationCard = (props) => {
  const [open, setOpen] = useState(false);
  const { reservation } = props;

  const handleOpenClose = () => {
    setOpen(!open);
  };

  return (
    <div className='reservation-item' onClick={handleOpenClose}>
      <NavLink to={'/reservation/' + reservation._id}>
        <div className='reservation-information'>
          <div className='reservation-image'>reservation image here</div>
          <div>
            <b>{reservation.listing.description}</b>
          </div>
          <div>
            <b>Details:</b> {reservation.listing.details.beds > 1 ? `${reservation.listing.details.beds} beds` : `${reservation.listing.details.beds} bed`}  {reservation.listing.details.baths > 1 ? `${reservation.listing.details.baths} baths` : `${reservation.listing.details.baths} bath`}
          </div>
          <div>
            <b>Rating:</b> {reservation.listing.rating.user} / 5
            </div>
          <div>
            <b>Starting Price:</b> ${reservation.listing.price}
          </div>
        </div>
      </NavLink>
    </div>
  )
};
export default ReservationCard;