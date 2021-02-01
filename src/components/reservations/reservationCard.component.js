import React from 'react';
import { app } from '../../utils/axiosConfig.js'
import Button from '@material-ui/core/Button';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import '../matches/listing/listings.css'

import { checkInToReservation, checkOutOfReservation } from '../../redux/actions/reservationActions';

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

class ReservationCard extends React.Component {
  constructor(props) {
    super(props);
    this.loading = props.loading;
    this.reservation = props.reservation;
    this.state = {
      checkState: false,
      confirmCheck: false,
      listing: null,
    };
  }

  componentDidMount() {
    if (this.reservation.active) {
      app.get('/listings/byId/' + this.reservation.listing)
        .then((res) => {
          this.setState({ listing: res.data.listing })
        })
        .catch((err) => {
          // alert('Unable to retrieve some reservations.')
        })
    }
  }

  handleCheckConfirm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ confirmCheck: false });
    if (this.checkState === 'out') {
      this.props.setReviewListingId(this.reservation.listing);
      this.props.setReviewModal(true);
      this.props.checkOutOfReservation(this.props.userSession.token, this.reservation._id);
      return;
    };
    if (this.checkState === 'in') return this.props.checkInToReservation(this.props.userSession.token, this.reservation._id);
  };

  render() {
    return (
      <>
        { this.reservation.active ? (
          !this.state.listing ? <div id="spinner"></div>
            : (
              <div className='listing-item'>
                <NavLink to={'/listing/' + this.state.listing._id}>
                  {this.confirmCheck ? (
                    <>
                      <div>Confirm check in / out?</div>
                      <>
                        <CustomButton onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          this.setState({ confirmCheck: false });
                        }
                        }>Cancel</CustomButton>
                        <CustomButton onClick={this.handleCheckConfirm}>Confirm</CustomButton>
                      </>
                    </>
                  ) : (
                      <div className='listing-information'>
                        <img className='listing-image' src={this.state.listing.pictures[0]} alt={this.state.listing.title} />
                        <b>{this.state.listing.title}</b>
                        {this.state.listing.location.street}, {this.state.listing.location.city}, {this.state.listing.location.state}, {this.state.listing.location.zipcode}
                        <div>
                          <b>Check-In: </b> {this.reservation.days[0].substring(5)} <br />
                          <b>Check-Out: </b> {this.reservation.days[1].substring(5)}
                        </div>
                        <div className="spacer_xxs" />
                        {this.props.userSession &&
                          this.props.userSession.userId === this.reservation.user &&
                          !this.props.reservation.checkedIn &&
                          new Date() >= new Date(this.reservation.days[0]) ? (
                            <CustomButton onClick={
                              (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                this.setState({ confirmCheck: true });
                                this.setState({ checkState: 'in' });
                              }}>
                              { !this.loading ? "Check-in" : <div id="spinner" />}
                            </CustomButton>
                          ) : (
                            <>
                              {/* Render an unclickable button */}
                            </>
                          )}
                        {this.props.userSession && this.props.userSession.userId === this.reservation.user && this.props.reservation.checkedIn ? (
                          <CustomButton onClick={
                            (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              this.setState({ confirmCheck: true });
                              this.setState({ checkState: 'out' });
                            }}>
                            { !this.loading ? "Check-Out" : <div id="spinner" />}
                          </CustomButton>
                        ) : null}
                      </div>
                    )}
                </NavLink>
              </div>
            )) : null}
      </>
    )
  };
}

const mapStateToProps = state => {
  const stateToReturn = { ...state, loading: state.Loading.loading };
  if (state.Login.userInfo) stateToReturn['userSession'] = state.Login.userInfo.session;
  return stateToReturn;
};

const mapDispatchToProps = dispatch => {
  return {
    checkInToReservation: (token, reservationId) => (dispatch(checkInToReservation(token, reservationId))),
    checkOutOfReservation: (token, reservationId) => (dispatch(checkOutOfReservation(token, reservationId)))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ReservationCard
));
