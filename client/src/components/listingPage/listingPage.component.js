import React, { Component } from 'react'
import axios from 'axios'
import './listingPage.css'

class ListingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listingID: this.props.match.params.id,
      listingDetails: {}
    }
    this.handleReserve = this.handleReserve.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:8080/listings/byId/' + this.state.listingID)
    .then((res) => {
      this.setState({
        listingDetails: res.data.listing
      })
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  handleReserve() {
    
  }

  render() {
    return (
      <div className="container">
        {this.state.listingDetails.description}
        <form onSubmit={this.handleReserve}>
          <input type="submit" value="reserve now /">
        </form>
      </div>
    )
  }
}

export default ListingPage
