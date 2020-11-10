// https://stripe.com/docs/checkout/integration-builder

import React, { Component } from 'react'
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js"
import './listingPage.css'

const stripePromise = loadStripe('pk_test_51HDNtOE7SomQuJWLTiEqzbIriLpsErElVGi9Qwjg7xzSKHsYgnNflvxLdpN4LdFte2O0h2Y2cdDxP0gvXAmXjdsu00TuwlmhAT')

class ListingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listingId: this.props.match.params.id,
      resDays: ''
    }
    this.handlePayment = this.handlePayment.bind(this)
    this.changeDays = this.changeDays.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:8080/listings/byId/' + this.state.listingId)
    .then((res) => {
      this.setState({
        listingDescription: res.data.listing.description,
        listingLocation: `${res.data.listing.location.city}, ${res.data.listing.location.state}, ${res.data.listing.location.country}`,
        listingImages: ['image1', 'image2', 'image3'],
        listingBaths: parseInt(res.data.listing.details.baths),
        listingBeds: parseInt(res.data.listing.details.beds),
        listingMaxPeople: parseInt(res.data.listing.details.maxpeople)
      })
      console.log(res.data.listing)
    })
    .catch((err) => {
      console.log(err.response)
    })
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

  async handlePayment() {
    const stripe = await stripePromise;
    const data = {
      listingId: this.state.listingId,
      days: parseInt(this.state.resDays)
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
  };

  changeDays(e) {
    this.setState({
      resDays: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        {this.state.listingDescription} <br />
        {this.state.listingLocation} <br />
        {this.state.listingImages} <br />
        {this.state.listingBeds} beds <br />
        {this.state.listingBaths} baths <br />
        {this.state.listingMaxPeople} people max <br />
        <form onSubmit={this.handlePayment}>
          <input type="text" placeholder="days" onChange={this.changeDays} value={this.state.resDays} />
          <input type="submit" value="reserve now" />
        </form>
      </div>
    )
  }
}

export default ListingPage
