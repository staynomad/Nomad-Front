import React, { Component } from 'react'
import axios from 'axios'
import '../listingPage/paymentSuccess.css'

class verifyAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      verified: false
    }
  }

  componentDidMount() {
    axios.post("http://localhost:8080/user/verify/" + this.props.match.params.userId)
    .then(() => {
      this.setState({
        verified: true
      })
      setTimeout(() => {
        this.props.history.push('/MyAccount')
      }, 1000)
    }
    )
    .catch((err) => {
      alert('Could not verify email. Please try again.')
    })
  }

  render() {
    return (
      <div className="container">
        { this.state.verified
          ? <div>
              <h1>Thank you for verifying your email</h1> <br />
              You will be redirected shortly <br /><br /><br />
              <div id="spinner"></div>
            </div>
          : <div id="spinner"></div>
        }
      </div>
    )
  }
}

export default verifyAccount
