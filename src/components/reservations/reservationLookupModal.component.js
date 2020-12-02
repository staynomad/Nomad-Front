import React, { useState } from 'react';
import './reservationLookupModal.css';
import { app } from '../../utils/axiosConfig.js'
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

    // console.log("reservationInfo: ", reservationInfo);

    const handleSubmit = async event => {
      event.preventDefault ();
      let info = {}

      app.get(`/reservation/byId/${reservationID}`)
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
          <h2>Find your reservation</h2>
          <div className="spacer_s"></div>
          <form onSubmit={handleSubmit}>
            <label id="reservationID" style={{'fontFamily': 'Playfair Display'}}>
              <input
                className="login_bar"
                type="text"
                id="reservationID"
                name="reservationID"
                placeholder="reservation ID"
                onChange={e => setReservationID(e.target.value)}
                style={{"width": "100%", "padding-left": "2%"}}
              />
            </label>
            <p>You'll find this in your reservation confirmation email.</p>
            {error ? <p style={{color: 'red'}}>There has been an error finding your reservation! Please make sure the ID is correct.</p> : null}
            <label id="submit">
              <button
                type="submit"
                id="reservationIDSubmit"
                className="searchbutton btn"
              >
                search
              </button>
            </label>
          </form>
          <p className='botText'>
            New to VHomes?
            <a
              href='/SignUp'
              style={{ color: "#02b188", paddingLeft: "2%" }}
            > sign up
            </a>
          </p>
        </div>
        :
        <div>
          <h2>{listingInfo.title}</h2>
          <p className="listingInfo">{listingInfo.location.street}, {listingInfo.location.city}, {listingInfo.location.state}, {listingInfo.location.zipcode}, {listingInfo.location.country}</p>
          <div className="listingImage">{listingInfo.pictures.length !== 0 && listingInfo.pictures.map (pic => (<img style={{resizeMode: 'contain', height: 100, width: 200}} src={pic} key={pic} alt="Property"/>))}</div>
          <div className="spacer_xs"></div>

          <hr />

          <h2>Your Reservation</h2>
          <p className="listingInfo">Check in: {reservationInfo.reservation.days[0]}, Check out: {reservationInfo.reservation.days[1]}</p>
          <p className="listingInfo">This is an {reservationInfo.reservation.active ? <p style={{color: 'white'}}>You have{reservationInfo.reservation.checkedIn ? ' ' : ' not '}checked in.</p> : 'inactive'} reservation.</p>

      </div>
      }
      <div className="spacer_s"></div>
      <p className="exit" onClick={handleReturnHome}>
        exit
      </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getListingById: listingId => dispatch(getListingById(listingId))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ReservationLookup));
