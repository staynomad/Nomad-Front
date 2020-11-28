import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './reservationLookupModal.css';
import axios from 'axios';
import { getListingById } from '../../redux/actions/searchListingActions';
import { connect, useSelector } from 'react-redux';
import {withRouter} from 'react-router-dom';

const ReservationLookup = (props) => {
    const { reservationModal, setReservationModal, getListingById } = props;
    const [reservationID, setReservationID] = useState("")
    const [lookup, setLookup] = useState(true)
    const listingInfo = useSelector(state => state.Listing.editListing);
    const [error, setError] = useState(false)
    const [reservationInfo, setReservationInfo] = useState({})

    console.log("reservationInfo: ", reservationInfo);
    
    const handleSubmit = async event => {
      event.preventDefault ();
      let info = {}

      axios.get(`http://localhost:8080/reservation/byId/${reservationID}`)
      .then(res => info = res.data)
      .then(() => setReservationInfo(info))
      .then(() => getListingById(info.reservation.listing))
      .then(() => setLookup(false))
      .catch(err => setError(true));
    };

    const handleReturnHome = async event => {
      event.preventDefault();
      setReservationModal(false);
      setLookup(false);
    }

    return (
    <div id="reservationLookupModal-page">
        <div className="modal-content reservationLookup-container">
        {lookup
        ?
        <div>
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
            {error ? <p style={{color: 'red'}}>There has been an error finding your reservation! Please make sure the ID is correct.</p> : <div><br /><br /></div>}
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
        </div>
        :
        <div>
          <h1>Your Reservation</h1>
          <p style={{color: 'white'}}>Check in: {reservationInfo.reservation.days[0]}, Check out: {reservationInfo.reservation.days[1]}</p>
          <p style={{color: 'white'}}>Length of stay: {reservationInfo.reservation.days.length} days</p>
          <p style={{color: 'white'}}>This is an {reservationInfo.reservation.active ? 'active' : 'inactive'} reservation.</p>
          <p style={{color: 'white'}}>You have{reservationInfo.reservation.checkedIn ? ' ' : ' not '}checked in.</p>
          <p style={{color: 'white'}}>You booked this reservation at {reservationInfo.reservation.createdAt}.</p>
          <hr />
          <h1>{listingInfo.title}</h1>
          <p style={{color: 'white'}}>{listingInfo.description}</p>
          <h2>Price: ${listingInfo.price} per night</h2>
          {listingInfo.pictures.length !== 0 && listingInfo.pictures.map (pic => (<img style={{resizeMode: 'contain', height: 100, width: 200}} src={pic} key={pic} alt="Image of property"/>))}
          <p>Beds: {listingInfo.details.beds}, Baths: {listingInfo.details.baths}, Maximum guests: {listingInfo.details.maxpeople}</p>
          <p>{listingInfo.location.street}, {listingInfo.location.city}, {listingInfo.location.state}, {listingInfo.location.zipcode}, {listingInfo.location.country}</p>
      </div>
      }
      <br />
      <CustomButton onClick={handleReturnHome}>
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

