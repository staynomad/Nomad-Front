// https://stripe.com/docs/checkout/integration-builder

import React, { Component } from 'react'
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js"
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import './listingPage.css'

const stripePromise = loadStripe('pk_test_51HDNtOE7SomQuJWLTiEqzbIriLpsErElVGi9Qwjg7xzSKHsYgnNflvxLdpN4LdFte2O0h2Y2cdDxP0gvXAmXjdsu00TuwlmhAT')

class ListingPage extends Component {
  constructor(props) {
    super(props)
    this.handlePayment = this.handlePayment.bind(this)
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  async componentDidMount() {
    await axios.get('http://localhost:8080/listings/byId/' + this.props.match.params.id)
    .then((res) => {
      this.setState({
        listingDescription: res.data.listing.description,
        listingLocation: `${res.data.listing.location.city}, ${res.data.listing.location.state}, ${res.data.listing.location.country}`,
        listingImages: ['image1', 'image2', 'image3'],
        listingBaths: parseInt(res.data.listing.details.baths),
        listingBeds: parseInt(res.data.listing.details.beds),
        listingMaxPeople: parseInt(res.data.listing.details.maxpeople),
        listingStartDate: res.data.listing.available[0],
        listingEndDate: res.data.listing.available[1]
      })
      console.log(res.data.listing)
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  handlePayment() {

  }

  /*handlePayment() {
    const data = {
      listingId: this.state.listingId,
      days: parseInt(this.state.resDays)
    }
    axios.post('http://localhost:8080/payment/create-session', data)
    .then((res) => {
      console.log(res)
    })
    .then((session) => {
      return stripePromise.redirectToCheckout({ sessionId: session.id })
    })
    .catch((err) => {
      console.log(err.response)
    })
  }*/

  /* async handlePayment() {
    const stripe = await stripePromise;
    const data = {
      listingId: this.state.listingId,
      days: parseInt(this.state.resDays) // fix this (pass dates in as array with start and end date of reservation)
    }
    const response = await fetch("payment/create-session", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      alert("Could not reach store. Please try again.")
    }
  }; */

  /*changeDays(e) {
    this.setState({
      resDays: e.target.value
    })
  }*/

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
    let startDate = new Date(this.state.listingStartDate)
    let endDate = new Date(this.state.listingEndDate)
    endDate.setDate(endDate.getDate() + 1) // react-day-picker includes "after" date in disabled days
    return (
      <div className="container">
        {this.state.listingDescription} <br />
        {this.state.listingLocation} <br />
        {this.state.listingImages} <br />
        {this.state.listingBeds} beds <br />
        {this.state.listingBaths} baths <br />
        {this.state.listingMaxPeople} people max <br />

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

        <form onSubmit={this.handlePayment}>
          <input type="submit" value="reserve now" />
        </form>
      </div>
    )
  }
}

export default ListingPage
