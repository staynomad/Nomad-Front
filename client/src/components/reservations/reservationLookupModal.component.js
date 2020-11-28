import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './reservationLookupModal.css';
import axios from 'axios';
import { getListingById } from '../../redux/actions/searchListingActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// must add logic to check if user is logged in

const ReservationLookup = (props) => {
    const { reservationModal, setReservationModal, getListingById } = props;
    const [reservationID, setReservationID] = useState("")
    const [ listing, setListing ] = useState("")

    console.log("props: ", props)

    const handleSubmit = async event => {
      event.preventDefault();
      const test = "5f6cd7a14720742685b3eedb"
      setListing(await getListingById(test))
    };

    return (
    <div id="reservationLookupModal-page">
        <div className="modal-content reservationLookup-container">
          <h1 style={{color: 'white', fontFamily: 'Playfair Display'}}>Find more details about a reservation!</h1>
          <form onSubmit={handleSubmit}>
            <label id="reservationID" style={{'fontFamily': 'Playfair Display'}}>
              <input
                type="text"
                id="reservationID"
                name="reservationID"
                placeholder="Reservation ID"
                onChange={e => setReservationID(e.target.value)}
                style={{backgroundColor: 'white', width: '60%'}}
              />
            </label>
            <br /><br />
            <label id="submit">
              <Button
                type="submit"
                id="reservationIDSubmit"
                style={{width: '30%', backgroundColor: '#00b183', 'fontFamily': 'Playfair Display'}}
              >
                Search
              </Button>
            </label>
          </form>
          <br />
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

const mapDispatchToProps = dispatch => {
  return {
    getListingById: listingId => dispatch(getListingById(listingId))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ReservationLookup));

