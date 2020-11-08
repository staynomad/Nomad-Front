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

  render() {
    return (
      <div className="container">
        {this.state.listingDetails.description}
      </div>
    )
  }
}

export default ListingPage
