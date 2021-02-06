// https://stripe.com/docs/checkout/integration-builder

import React, { Component } from "react";
import { app } from "../../utils/axiosConfig.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import DayPicker, { DateUtils } from "react-day-picker";
import ImageGallery from "react-image-gallery";
import StarRatings from "react-star-ratings";
import "react-day-picker/lib/style.css";
import "./listingPage.css";
import handleReq from "../../utils/fetchRequest";
import { submitReview } from "../../redux/actions/reviewActions";
import {
  getCalendarURL,
  importCalendar,
} from "../../redux/actions/calendarSyncActions";

const stripePublicKey =
  "pk_test_51HqRrRImBKNBYsooNTOTLagbqd8QUGaK6BeGwy6k2pQAJxkFF7NRwTT3ksBwyGVmq8UqhNVvKQS7Vlb69acFFCvq00hxgBuZhh";
const stripePromise = loadStripe(stripePublicKey);

class ListingPage extends Component {
  constructor(props) {
    super(props);
    this.handleSessionRedirect = this.handleSessionRedirect.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.state = this.getInitialState();
    this.setState({
      listingPictures: [],
      isLoading: true,
      outOfRange: false,
      rating: 0,
      review: "",
    });
  }

  async componentDidMount() {
    var today = new Date();
    this.setState({
      outOfRange: false,
    });
    // Sync calendar with remote if listing calendar was imported
    await this.props.getCalendarURL(this.props.match.params.id);
    if (this.props.Calendar.calendarURL) {
      await this.props.importCalendar(
        this.props.Calendar.calendarURL,
        this.props.match.params.id
      );
    }
    await app
      .get("/listings/byId/" + this.props.match.params.id)
      .then((res) => {
        // If the listing is a draft and the current user is not the host, redirect to 404
        if (
          !res.data.listing.active &&
          (!this.props.User.userInfo ||
            this.props.User.userInfo._id !== res.data.listing.userId)
        ) {
          window.location = "/page-not-found";
          return;
        }
        this.setState({
          listingTitle: res.data.listing.title,
          listingDescription: res.data.listing.description,
          listingLocation: `${res.data.listing.location.city}, ${res.data.listing.location.state}, ${res.data.listing.location.country}`,
          listingStreet: res.data.listing.location.street,
          listingZipcode: res.data.listing.location.zipcode,
          listingAptnum: res.data.listing.location.aptnum,
          listingBaths: res.data.listing.details.baths,
          listingBeds: res.data.listing.details.beds,
          listingMaxPeople: res.data.listing.details.maxpeople,
          listingPrice: res.data.listing.price,
          listingStartDate: res.data.listing.available[0],
          listingEndDate: res.data.listing.available[1],
          listingUser: res.data.listing.userId,
          listingPictures: res.data.listing.pictures,
          isActive: res.data.listing.active,
        });
        let pictures = [];
        for (let i = 0; i < this.state.listingPictures.length; i++) {
          pictures.push({
            original: String(this.state.listingPictures[i]),
          });
        }
        this.setState({
          listingPictures: pictures,
        });
        // Set default disabled days based on booked days in listing object
        let startDate = new Date(this.state.listingStartDate);
        let endDate = new Date(this.state.listingEndDate);
        endDate.setDate(endDate.getDate() + 1);
        startDate.setDate(startDate.getDate() + 1);
        let bookedDays = [
          {
            after: endDate,
            before: startDate,
          },
        ];
        // Append days from booked field in listing object
        for (let i = 0; i < res.data.listing.booked.length; i++) {
          let reserveStart = new Date(res.data.listing.booked[i].start);
          let reserveEnd = new Date(res.data.listing.booked[i].end);
          reserveStart.setDate(reserveStart.getDate());
          reserveEnd.setDate(reserveEnd.getDate() + 2);
          bookedDays.push({
            after: reserveStart,
            before: reserveEnd,
          });
        }
        bookedDays.push({
          before: new Date(today),
        });
        this.setState({
          listingBookedDays: bookedDays,
          today: today.setUTCHours(0, 0, 0, 0),
        });
        // Get host's email from their userId
        app.get(`/user/getUserInfo/${this.state.listingUser}`).then((res) =>
          this.setState({
            hostEmail: res.data.email,
            isLoading: false,
          })
        );
      })
      .catch((err) => {
        // console.log(err.response);
      });
  }

  async handleSessionRedirect() {
    this.setState({
      isLoading: true,
    });

    if (!this.props.userSession) {
      alert("Please log in to create a reservation.");
      return this.props.history.push("/login");
    }
    const selectedStartDay = JSON.stringify(this.state.from).substring(
      1,
      JSON.stringify(this.state.from).indexOf("T")
    );
    const selectedEndDay = JSON.stringify(this.state.to).substring(
      1,
      JSON.stringify(this.state.to).indexOf("T")
    );
    const data = {
      user: this.props.userSession.userId, // get userId from redux store
      listing: this.props.match.params.id,
      days: [selectedStartDay, selectedEndDay],
    };

    const stripe = await stripePromise;
    const resDays =
      parseInt((this.state.to - this.state.from) / (1000 * 3600 * 24)) + 1;
    const listingId = data.listing;
    let body = {
      listingId: listingId,
      days: resDays,
      dates: [this.state.from, this.state.to],
    };

    // Wrap calls in try-catch block.  All errors handled by catch
    try {
      const newReservation = await handleReq(
        "/reservation/createReservation",
        "POST",
        {
          Authorization: `Bearer ${this.props.userSession.token}`,
        },
        data
      );

      // If the stripe call succeeds, create reservation
      if (newReservation.status === 201) {
        const { reservationId } = newReservation.data;
        body["reservationId"] = reservationId;

        const response = await handleReq(
          "/payment/create-session",
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify(body)
        );
        // Redirect to stripe session after inactive reservation is made
        if (response.status === 201) {
          const session = response.data; //json();
          // Redirect to stripe checkout session
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          if (result.error) alert(result.error.message);
          this.setState({
            isLoading: false,
          });
        }
      }
    } catch (e) {
      console.log(e.response.data.errors);
      console.log(e);
      this.setState({
        isLoading: false,
      });
      alert(e.response.data.errors); //response.data
    }
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    // Check listing availability dates separately
    if (day < this.state.today) {
      this.setState({
        outOfRange: true,
      });
      return;
    }
    for (let i = 0; i < this.state.listingBookedDays.length; i++) {
      // Have to subtract one from end date of reservation because of offset
      const endDate = new Date(this.state.listingBookedDays[i].before);
      endDate.setDate(endDate.getDate() - 1);
      // Check if selected day falls within any of the disabled days
      if (day < endDate && day > this.state.listingBookedDays[i].after) {
        this.setState({
          outOfRange: true,
        });
        return;
      }
    }

    this.setState({
      outOfRange: false,
    });
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);

    // console.log(this.state.from, this.state.to)
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  handleChangeRating(newRating, name) {
    return this.setState({ [name]: newRating });
  }

  handleReviewChange(e) {
    const { name, value } = e.target;
    return this.setState({ [name]: value });
  }

  handleReviewSubmit(e) {
    e.preventDefault();
    const { rating, review } = this.state;
    const listingId = this.props.match.params.id;
    const token = this.props.userSession.token;

    this.props.submitReview(rating, review, listingId, token);
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    // const lessThanFourDays =
    //   parseInt((this.state.to - this.state.from) / (1000 * 3600 * 24)) + 1 < 4
    //     ? true
    //     : false;

    return (
      <div className="container_s">
        {!this.state.listingPictures ? (
          <div id="spinner"></div>
        ) : (
            <div>
              {!this.state.isActive ? (
                <div>
                  <h2 className="listing-title">
                    [DRAFT] {this.state.listingTitle}
                  </h2>
                  <div>This listing is not viewable to the public.</div>
                </div>
              ) : (
                  <h2 className="listing-title">{this.state.listingTitle}</h2>
                )}
              <h5 className="listing-location">{this.state.listingLocation}</h5>{" "}
              <br />
              <ImageGallery
                items={this.state.listingPictures}
                showThumbnails={false}
                showPlayButton={false}
                onErrorImageURL={"/images/default_listing.jpg"}
                originalAlt={`${this.state.listingTitle}`}
              />
              <div className="spacer_s"></div>
              <div className="listing-details">
                <p className="listing-description">
                  {this.state.listingDescription}
                </p>{" "}
                <br />
                <div className="details">
                  Beds: {this.state.listingBeds} <br />
                Baths: {this.state.listingBaths} <br />
                Max Guests: {this.state.listingMaxPeople} <br />
                Price: ${this.state.listingPrice.toFixed(2)}/Night
                <div className="spacer_xs"></div>
                  {this.props.userSession ? (
                    <>
                      <a href={`mailto:${this.state.hostEmail}`}>
                        <button className="btn green" type="button">
                          {" "}
                        Contact Host{" "}
                        </button>
                      </a>{" "}
                    </>
                  ) : null}
                  <div className="spacer_xxl"></div>
                </div>
              </div>
              <div className="listing-calendar">
                <div className="spacer_xs"></div>
                <div style={{ alignText: "center" }}>
                  {this.state.outOfRange ? (
                    "Selected day is not available."
                  ) : // lessThanFourDays ? (
                    //   "Minimum 4 days required"
                    // ) :
                    (
                      <div>
                        {!from && !to && "Please select the first day."}
                        {from && !to && "Please select the last day."}
                        {from &&
                          to &&
                          `From ${from.toLocaleDateString()} to
                    ${to.toLocaleDateString()}`}{" "}
                      </div>
                    )}
                </div>
                <DayPicker
                  className="Selectable"
                  selectedDays={[from, { from, to }]}
                  modifiers={modifiers}
                  onDayClick={this.handleDayClick}
                  disabledDays={this.state.listingBookedDays}
                  inputProps={{ required: true }}
                />
                <div className="spacer_xs"></div>
                <div className="reserve-now">
                  {this.state.from && this.state.to
                    // && !lessThanFourDays
                    ? (
                      this.state.isLoading ? (
                        <div id="spinner"></div>
                      ) : (
                          <input
                            className="btn green"
                            type="button"
                            value="reserve now"
                            onClick={this.handleSessionRedirect}
                          />
                        )
                    ) : null}
                </div>
              </div>
              {this.props.review ? (
                <>
                  <form onSubmit={this.handleReviewSubmit}>
                    <StarRatings
                      rating={this.state.rating}
                      changeRating={this.handleChangeRating}
                      starHoverColor="#00B183"
                      starRatedColor="#00B183"
                      name="rating"
                    />
                    <input
                      type="text"
                      name="review"
                      placeholder="e.g. This was a great place to stay!"
                      value={this.state.review}
                      onChange={this.handleReviewChange}
                      required
                    />
                    <button className="btn green" type="submit">
                      Submit Review
                  </button>
                  </form>
                </>
              ) : null}
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let stateToReturn = { ...state };
  if (state.Login.userInfo)
    stateToReturn["userSession"] = state.Login.userInfo.session;
  stateToReturn["calendarURL"] = state.Calendar.calendarURL;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitReview: (...args) => dispatch(submitReview(...args)),
    getCalendarURL: (listingId) => dispatch(getCalendarURL(listingId)),
    importCalendar: (calendarURL, listingId) =>
      dispatch(importCalendar(calendarURL, listingId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListingPage)
);
