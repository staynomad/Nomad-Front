import React, { Component } from 'react'
import axios from 'axios'
import './listingPage.css'

class ListingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listingId: this.props.match.params.id,
      listingDetails: {},
      resDays: null
    }
    this.handlePayment = this.handlePayment.bind(this)
    this.changeDays = this.changeDays.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:8080/listings/byId/' + this.state.listingId)
    .then((res) => {
      this.setState({
        listingDetails: res.data.listing
      })
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  handlePayment() {
    const data = {
      // make sure the names of the keys match what you have set in the api request
      listingId: this.state.listingId,
      days: this.state.resDays
    }
    axios.post('http://localhost:8080/payment/byId/', data) // format is (url, data)
  }

  changeDays(e) {
    this.setState({
      resDays: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        {this.state.listingDetails.description}
        <form onSubmit={this.handlePayment}>
          <input type="text" placeholder="days" onChange={this.changeDays} value={this.state.resDays} />
          <input type="submit" value="reserve now" />
        </form>
      </div>
    )
  }
}

export default ListingPage
