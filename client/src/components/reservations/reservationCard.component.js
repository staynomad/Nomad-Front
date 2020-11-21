import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const CustomButton = withStyles((theme) => ({
  root: {
    color: "#00B183",
    backgroundColor: "transparent",
    border: "2px solid #00B183",
    borderRadius: "8px",
    font: "inherit",
    fontSize: "16px",
    fontWeight: "normal",
  },
}))(Button);

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
            <b>Reservation Date:</b> `${reservation.date[0]} - ${reservation.date[1]}`
          </div>
        </div>
      </NavLink>
      {props.userSession && props.userSession.userId === reservation.userId ? (
        <CustomButton>Change</CustomButton>
      ) : null}
      {props.userSession && props.userSession.userId === reservation.userId ? (
        <CustomButton>Cancel</CustomButton>
      ) : null}
    </div>
  )
};
export default ReservationCard;