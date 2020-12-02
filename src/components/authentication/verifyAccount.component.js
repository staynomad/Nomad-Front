import React, { Component } from 'react'
import { app } from '../../utils/axiosConfig.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../listingPage/paymentSuccess.css'

class verifyAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      verified: false,
      loading: false,
      sent: false,
    }
    this.resendVerifyEmail = this.resendVerifyEmail.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.userId !== "send")
    {
      app.post("/user/verify/" + this.props.match.params.userId)
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
  }

  resendVerifyEmail() {
    this.setState({
      loading: true
    })
    if (!this.props.userSession) {
      alert("Please log in to send a verification email for your account.")
      return this.props.history.push('/login')
    }
    app.get(`/user/getUserInfo/${this.props.userSession.userId}`)
    .then((res) => {
      const data = {
        email: res.data.email,
        userId: this.props.userSession.userId
      }
      app.post("/accountVerification/sendVerificationEmail", data, {
        headers: {
          "Authorization": `Bearer ${this.props.userSession.token}`
        }
      })
      .then(() => {
        this.setState({
          loading: false,
          sent: true
        })
        setTimeout(() => {
          this.props.history.push('/')
        }, 1000)
      })
    })
  }

  render() {
    return (
      <div className="container">
        {this.props.match.params.userId !== "send"
          ? this.state.verified
            ? <div>
                <h1>Thank you for verifying your email</h1> <br />
                You will be redirected shortly <br /><br /><br />
                <div id="spinner"></div>
              </div>
            : <div id="spinner"></div>
          : <div>
              <h1>Verify your account</h1> <br />
              Click the button below to resend a verification link <br /><br />
              <input
                type="button"
                onClick={this.resendVerifyEmail}
                value="Send Now" /> <br /><br /><br />
              {this.state.loading
                ? <div id="spinner"></div>
                : null
              }
              {this.state.sent
                ? <div>
                    <h3>Verification has been sent! Please check your email.</h3> You will be redirected shortly.
                  </div>
                : null
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
  verifyAccount
))
