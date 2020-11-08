import React, { Component } from "react"

class Reservation extends Component {
  constructor(props) {
    super(props)
    // Values needed: listing dates available (from listing id), user email (from user id)
    this.state = {
      isVisible: false
    }
    this.handleBookNow = this.handleBookNow.bind(this);
  }

  handleBookNow(e) {
    e.preventDefault()
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  handleReserve(e) {
    e.preventDefault()
    // Stripe code
  }

  render() {
    return (
      <div>
        <input type="button" value="Book Now"/>
        <div>
          { this.state.isVisible && <input type="button" value="reserve"/> }//display calendar here too
        </div>
      </div>
    )
  }
}

export default Reservation
