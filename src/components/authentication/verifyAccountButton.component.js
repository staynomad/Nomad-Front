import React, { Component } from "react";
import { app } from "../../utils/axiosConfig.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./verifyAccountButton.css";

class VerifyAccountButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: false,
      loading: false,
      sent: false,
    };
    this.resendVerifyEmail = this.resendVerifyEmail.bind(this);
  }

  resendVerifyEmail() {
    this.setState({
      loading: true,
    });
    if (!this.props.userSession) {
      alert("Please log in to send a verification email for your account.");
      return this.props.history.push("/login");
    }
    app.get(`/user/getUserInfo/${this.props.userInfo._id}`).then((res) => {
      const data = {
        user: res,
      };
      console.log(this.props.userSession.token);
      app
        .post("/accountVerification/sendVerificationEmail", data, {
          headers: {
            Authorization: `Bearer ${this.props.userSession.token}`,
          },
        })
        .then(() => {
          this.setState({
            loading: false,
            sent: true,
          });
          // setTimeout(() => {
          //   this.props.history.push("/");
          // }, 1000);
        });
    });
  }

  render() {
    return (
      <div>
        <h1>Verify your account</h1> <br />
        Click the button below to resend a verification link <br />
        <br />
        <button
          type="button"
          className="btn green edit-profile-btn"
          onClick={this.resendVerifyEmail}
        >
          Send Verification Email
        </button>
        <br />
        <br />
        <br />
        {this.state.loading ? <div id="spinner"></div> : null}
        {this.state.sent ? (
          <div>
            <h3>Verification has been sent! Please check your email.</h3>{" "}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.Login.userInfo && state.User.userInfo)
    return {
      userSession: state.Login.userInfo.session,
      userInfo: state.User.userInfo,
    };
  return {};
};

export default withRouter(connect(mapStateToProps)(VerifyAccountButton));
