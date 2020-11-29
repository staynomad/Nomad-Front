// https://stripe.com/docs/checkout/integration-builder

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js"
import DayPicker, { DateUtils } from 'react-day-picker'
import SimpleImageSlider from 'react-simple-image-slider'
import 'react-day-picker/lib/style.css'
import './listingPage.css'
import './paymentSuccess.css'

const stripePublicKey = "pk_test_51HqRrRImBKNBYsooNTOTLagbqd8QUGaK6BeGwy6k2pQAJxkFF7NRwTT3ksBwyGVmq8UqhNVvKQS7Vlb69acFFCvq00hxgBuZhh"

const stripePromise = loadStripe(stripePublicKey);

class ListingPage extends Component {
  constructor(props) {
    super(props)
    this.handlePayment = this.handlePayment.bind(this)
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
    this.setState({
      listingPictures: [],
      isLoading: true
    })
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    })
    await axios.get('http://localhost:8080/listings/byId/' + this.props.match.params.id)
    .then((res) => {
      this.setState({
        listingTitle: res.data.listing.title,
        listingDescription: res.data.listing.description,
        listingLocation: `${res.data.listing.location.city}, ${res.data.listing.location.state}, ${res.data.listing.location.country}`,
        listingBaths: parseInt(res.data.listing.details.baths),
        listingBeds: parseInt(res.data.listing.details.beds),
        listingMaxPeople: parseInt(res.data.listing.details.maxpeople),
        listingPrice: res.data.listing.price,
        listingStartDate: res.data.listing.available[0],
        listingEndDate: res.data.listing.available[1],
        listingUser: res.data.listing.userId,
        listingPictures: res.data.listing.pictures
      })
      /* let pictures = []
      for (let i = 0; i < res.data.listing.pictures.length; i++) {
        pictures.push({url: res.data.listing.pictures[i]})
      }
      this.setState({
        listingPictures: pictures
      }) */
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
        listingBookedDays: bookedDays,
        isLoading: false
      })
      // Get host's email from their userId
      axios.get(`http://localhost:8080/user/getUserInfo/${this.state.listingUser}`)
      .then((res) =>
        this.setState({
          hostEmail: res.data.email,
          isLoading: false
        })
      )
    })
    .catch((err) => {
      this.setState({
        isLoading: false
      })
      console.log(err.response)
    })
  }

  handlePayment() {
    this.setState({
      isLoading: true
    })
    if (!this.props.userSession) {
      alert("Please log in to create a reservation.")
      return this.props.history.push('/login')
    }
    const selectedStartDay = JSON.stringify(this.state.from).substring(1, JSON.stringify(this.state.from).indexOf("T"))
    const selectedEndDay = JSON.stringify(this.state.to).substring(1, JSON.stringify(this.state.to).indexOf("T"))
    const data = {
      user: this.props.userSession.userId, // get userId from redux store
      listing: this.props.match.params.id,
      days: [selectedStartDay, selectedEndDay]
    }
    axios.post('http://localhost:8080/reservation/createReservation', data, {
      headers: {
        "Authorization": `Bearer ${this.props.userSession.token}`
      }
    })
    .then(async (res) => {
      // Create Stripe Checkout Session
      const stripe = await stripePromise;
      const resDays = parseInt((this.state.to - this.state.from) / (1000 * 3600 * 24)) + 1;
      const listingId = data.listing;
      const body = {
        listingId: listingId,
        days: resDays
      }
      const response = await fetch('http://localhost:8080/payment/create-session', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const session = await response.json();
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        alert(result.error.message);
      }
      this.setState({
        isLoading: false
      })
    })
    .catch((err) => {
      this.setState({
        isLoading: false
      })
      alert(err.response.data.errors)
      window.location.reload()
    })
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    }
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state)
    this.setState(range)
  }

  handleResetClick() {
    this.setState(this.getInitialState())
  }

  render() {
    const { from, to } = this.state
    const modifiers = { start: from, end: to }

    return (
      <div className="container_s">
      {
        this.state.isLoading
        ? <div id="spinner"></div>
        : <div>
            <h4 className="subtitle">{this.state.listingTitle}</h4>
            <h5>{this.state.listingLocation}</h5> <br />
            <img className="reservation-image" src={this.state.listingPictures} alt={this.state.listingTitle} /> <br />
            {/*<SimpleImageSlider
              width={896}
              height={504}
              images={this.state.listingPictures}
            />*/}

            <p>{this.state.listingDescription}</p> <br />
            beds: {this.state.listingBeds} <br />
            baths: {this.state.listingBaths} <br />
            {this.state.listingMaxPeople} people max <br />
            ${this.state.listingPrice} per night <br />
            <a href={`mailto:${this.state.hostEmail}`}>
              <button type="button"> Contact Host </button>
            </a> <br /><br />

            <div>
              <p>
                {!from && !to && 'Please select the first day.'}
                {from && !to && 'Please select the last day.'}
                {from &&
                  to &&
                  `Selected from ${from.toLocaleDateString()} to
                      ${to.toLocaleDateString()}`}{' '}
                {from && to && (
                  <button className="link" onClick={this.handleResetClick}>
                    Reset
                  </button>
                )}
              </p>
              <DayPicker
                className="Selectable"
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
                disabledDays={this.state.listingBookedDays}
                inputProps={
                  { required: true }
                }
              />
          </div>
          {
            this.state.from && this.state.to ?
            <input type="button" value="reserve now" onClick={this.handlePayment} /> :
            null
          }
        </div>
      }
    </div>
    )
  }
}

const mapStateToProps = state => {
  if (state.Login.userInfo) return {
    userSession: state.Login.userInfo.session,
  }
  return {}
}

export default withRouter(connect(
  mapStateToProps,
)(
  ListingPage
))
