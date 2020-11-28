import React from 'react';
import {NavLink} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './reservationLookupModal.css';

const ReservationLookup = ({reservationModal, setReservationModal}) => {

    console.log("IN RESERVATION LOOKUP")
    console.log("reservationModal: ", reservationModal)

    return (
    <div id="reservationLookupModal-page">
        <div className="modal-content reservationLookup-container">
        <h1 style={{color: 'white', fontFamily: 'Playfair Display'}}>This is the reservation lookup modal.</h1>
        <CustomButton onClick={e => setReservationModal(false)}>
            Return Home
        </CustomButton>
        </div>
    </div>
    );
};

const CustomButton = withStyles (theme => ({
  root: {
    color: 'white',
    backgroundColor: 'transparent',
    border: '2px solid white',
    borderRadius: '8px',
    font: 'inherit',
    fontSize: '16px',
    fontWeight: 'normal',
  },
})) (Button);

export default ReservationLookup;
