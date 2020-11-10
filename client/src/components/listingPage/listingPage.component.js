import React, { Component } from 'react'
import axios from 'axios'
import './listingPage.css'

class ListingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listingID: this.props.match.params.id,
      listingDetails: {},
      resDays: 0
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

  changeDays(e) {
    this.setState({
      resDays: e.target.value
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.listingDetails.description}
        <form onSubmit={this.handleReserve}>
          <input type="submit" value="reserve now" />
          <input type="text" placeholder="days" onChange={changeDays} value={this.state.resDays} />
        </form>
      </div>
    )
  }
}

export default ListingPage
