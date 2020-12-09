// https://stripe.com/docs/checkout/integration-builder


import React, { Component } from 'react'
import { app } from '../../utils/axiosConfig.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js"
import DayPicker, { DateUtils } from 'react-day-picker'
import ImageGallery from 'react-image-gallery'
import 'react-day-picker/lib/style.css'
import './listingPage.css'


const stripePublicKey =
  "pk_test_51HqRrRImBKNBYsooNTOTLagbqd8QUGaK6BeGwy6k2pQAJxkFF7NRwTT3ksBwyGVmq8UqhNVvKQS7Vlb69acFFCvq00hxgBuZhh";

const stripePromise = loadStripe(stripePublicKey);

class ListingPage extends Component {
  constructor(props) {
    super(props);
    this.handlePayment = this.handlePayment.bind(this);
    this.handlePaymentReordered = this.handlePaymentReordered.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
    this.setState({
      listingPictures: [],
      isLoading: true,
    });
  }

  async componentDidMount() {
    await app.get('/listings/byId/' + this.props.match.params.id)
      .then((res) => {
        this.setState({
          listingTitle: res.data.listing.title,
          listingDescription: res.data.listing.description,
          listingLocation: `${res.data.listing.location.city}, ${res.data.listing.location.state}, ${res.data.listing.location.country}`,
          listingStreet: res.data.listing.location.street,
          listingZipcode: res.data.listing.location.zipcode,
          listingAptnum: res.data.listing.location.aptnum,
          listingBaths: parseInt(res.data.listing.details.baths),
          listingBeds: parseInt(res.data.listing.details.beds),
          listingMaxPeople: parseInt(res.data.listing.details.maxpeople),
          listingPrice: res.data.listing.price,
          listingStartDate: res.data.listing.available[0],
          listingEndDate: res.data.listing.available[1],
          listingUser: res.data.listing.userId,
          listingPictures: res.data.listing.pictures
        })
        let pictures = []
        for (let i = 0; i < this.state.listingPictures.length; i++) {
          pictures.push({
            original: String(this.state.listingPictures[i])
          })
        }
        this.setState({
          listingPictures: pictures
        })
        // Set default disabled days based on booked days in listing object
        let startDate = new Date(this.state.listingStartDate)
        let endDate = new Date(this.state.listingEndDate)
        endDate.setDate(endDate.getDate() + 1)
        startDate.setDate(startDate.getDate() + 1)
        let bookedDays = [{
          after: endDate,
          before: startDate
        }]
        // Append days from booked field in listing object
        for (let i = 0; i < res.data.listing.booked.length; i++) {
          let reserveStart = new Date(res.data.listing.booked[i].start)
          let reserveEnd = new Date(res.data.listing.booked[i].end)
          reserveStart.setDate(reserveStart.getDate())
          reserveEnd.setDate(reserveEnd.getDate() + 2)
          bookedDays.push({
            after: reserveStart,
            before: reserveEnd
          })
        }
        this.setState({
          listingBookedDays: bookedDays
        })
        // Get host's email from their userId
        app.get(`/user/getUserInfo/${this.state.listingUser}`)
          .then((res) =>
            this.setState({
              hostEmail: res.data.email,
              isLoading: false
            })
          )
      })
      .catch((err) => {
        console.log(err.response)
      })

  }

  handlePayment() {
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
    app.post("/reservation/createReservation", data, {
      headers: {
        Authorization: `Bearer ${this.props.userSession.token}`,
      },
    })
      .then(async (res) => {
        // Create Stripe Checkout Session
        const stripe = await stripePromise;
        const resDays =
          parseInt((this.state.to - this.state.from) / (1000 * 3600 * 24)) + 1;
        const listingId = data.listing;
        const body = {
          listingId: listingId,
          days: resDays,
        };
        const response = await app({
          url: '/payment/create-session',
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify(body)
        }).then((response) => {
          return response.data;
        }).catch((err) => console.log(err))


        //   "http://localhost:8080/payment/create-session",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(body),
        //   }
        // );
        const session = await response; //json();
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          alert(result.error.message);
        }
        this.setState({
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
        });
        alert(err.response.errors); //response.data
        window.location.reload();
      });
  }

  async handlePaymentReordered() {
    this.setState({
      isLoading: true,
    });

    if (!this.props.userSession) {
      alert("Please log in to create a reservation.");
      return this.props.history.push("/login");
    };
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
    const body = {
      listingId: listingId,
      days: resDays,
    };

    // Wrap calls in try-catch block.  All errors handled by catch
    try {
      const response = await app({
        url: '/payment/create-session',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(body)
      });

      // If the stripe call succeeds, create reservation
      if (response.status === 201) {
        const newReservation = app.post("/reservation/createReservation", data, {
          headers: {
            Authorization: `Bearer ${this.props.userSession.token}`,
          },
        });

        // If creating a reservation succeeds
        // continue with the rest of the stripe stuff
        if (newReservation.status === 201) {
          //   "http://localhost:8080/payment/create-session",
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify(body),
          //   }
          // );
          const session = await response; //json();
          // When the customer clicks on the button, redirect them to Checkout.
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          if (result.error) alert(result.error.message);
          this.setState({
            isLoading: false,
          });

          return response.data;
        }
      };
    } catch (e) {
      this.setState({
        isLoading: false,
      });
      alert(e.response.errors); //response.data
      window.location.reload();
    }
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div className="container_s">
        {
          !this.state.listingPictures || !this.state.listingTitle || !this.state.listingLocation || !this.state.listingDescription || !this.state.listingBeds || !this.state.listingBaths || !this.state.listingMaxPeople || !this.state.listingPrice
            ? <div id="spinner"></div>
            : <div>
              <h2 className="listing-title">{this.state.listingTitle}</h2>
              <h5 className="listing-location">{this.state.listingLocation}</h5> <br />

              <ImageGallery
                items={this.state.listingPictures}
                showThumbnails={false}
                showPlayButton={false}
                onErrorImageURL={"Error loading images."}
                originalAlt={`${this.state.listingTitle}`}
              />

              <div className="spacer_s"></div>
              <div className="listing-details">
                <p className="listing-description">{this.state.listingDescription}</p> <br />
                <div className="details">
                  Beds: {this.state.listingBeds} <br />
                Baths: {this.state.listingBaths} <br />
                Max Guests: {this.state.listingMaxPeople} <br />
                Price: ${this.state.listingPrice}/Night
                <div className="spacer_xs"></div>
                  <a href={`mailto:${this.state.hostEmail}`}>
                    <button className="btn green" type="button"> Contact Host </button>
                  </a>{" "}
                  <div className="spacer_xxl"></div>
                </div>
              </div>

              <div className="listing-calendar">
                <div className="spacer_xs"></div>
                <div style={{ "align-text": "center" }}>
                  {!from && !to && 'Please select the first day.'}
                  {from && !to && 'Please select the last day.'}
                  {from &&
                    to &&
                    `From ${from.toLocaleDateString()} to
                      ${to.toLocaleDateString()}`}{" "}
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
                  {this.state.from && this.state.to ? (
                    this.state.isLoading ?
                      <div id="spinner"></div> :
                      <input
                        className="btn green"
                        type="button"
                        value="reserve now"
                        onClick={this.handlePaymentReordered}
                      />
                  ) : null}
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.Login.userInfo)
    return {
      userSession: state.Login.userInfo.session,
    };
  return {};
};

export default withRouter(connect(mapStateToProps)(ListingPage));
