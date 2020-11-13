// https://stripe.com/docs/checkout/integration-builder

import React, { Component } from 'react'
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js"
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import './listingPage.css'

const stripePublicKey = "pk_test_51HDNtOE7SomQuJWLTiEqzbIriLpsErElVGi9Qwjg7xzSKHsYgnNflvxLdpN4LdFte2O0h2Y2cdDxP0gvXAmXjdsu00TuwlmhAT"

const stripePromise = loadStripe(stripePublicKey);

class ListingPage extends Component {
  constructor(props) {
    super(props)
    this.handlePayment = this.handlePayment.bind(this)
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  async componentDidMount() {
    this.setState({
        reserved: false
    })
    await axios.get('http://localhost:8080/listings/byId/' + this.props.match.params.id)
    .then((res) => {
      this.setState({
        listingDescription: res.data.listing.description,
        listingLocation: `${res.data.listing.location.city}, ${res.data.listing.location.state}, ${res.data.listing.location.country}`,
        listingImages: ['image1', 'image2', 'image3'],
        listingBaths: parseInt(res.data.listing.details.baths),
        listingBeds: parseInt(res.data.listing.details.beds),
        listingMaxPeople: parseInt(res.data.listing.details.maxpeople),
        listingPrice: res.data.listing.price,
        listingStartDate: res.data.listing.available[0],
        listingEndDate: res.data.listing.available[1],
        listingBookedDays: res.data.listing.booked
      })
      console.log(res.data.listing.booked)
      console.log(this.state.listingBookedDays)
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  async handlePayment() {
    const selectedStartDay = JSON.stringify(this.state.from).substring(1, JSON.stringify(this.state.from).indexOf("T"))
    const selectedEndDay = JSON.stringify(this.state.to).substring(1, JSON.stringify(this.state.to).indexOf("T"))
    const data = {
      user: "5f8e287c44c48ccf9f9c90cb", // get user email from redux store
      listing: this.props.match.params.id,
      days: [selectedStartDay, selectedEndDay]
    }
    axios.post('http://localhost:8080/reservation/createReservation', data)
    .then((res) => {
      this.setState({
        reserved: true
      })
    })
    .catch((err) => {
      alert(err.response.data.errors)
    })

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
      console.log(result.error.message);
    }
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    }
    this.setState({
      reserved: false
    })
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
    let startDate = new Date(this.state.listingStartDate)
    let endDate = new Date(this.state.listingEndDate)
    endDate.setDate(endDate.getDate() + 1) // react-day-picker includes "after" date in disabled days
    startDate.setDate(startDate.getDate() + 1)

    return (
      <div className="container">
        {this.state.listingDescription} <br />
        {this.state.listingLocation} <br />
        {this.state.listingImages} <br />
        {this.state.listingBeds} beds <br />
        {this.state.listingBaths} baths <br />
        {this.state.listingMaxPeople} people max <br />
        ${this.state.listingPrice} per night <br />

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
            disabledDays={[
              {
                after: endDate,
                before: startDate
              }
            ]}
          />
        </div>

      <input type="button" value="reserve now" onClick={this.handlePayment} /> <br />
      { this.state.reserved ? <h2> reserved! </h2> : ""}
      </div>
    )
  }
}

export default ListingPage
