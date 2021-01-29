import React, { Component } from "react";
import { app } from "../../utils/axiosConfig.js";

class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailSent: false,
      replyText: "",
      isLoading: false,
    };
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  handleSubscribe() {
    this.setState({
      isLoading: true,
    });
    const data = {
      email: this.state.email,
    };
    app
      .post("/subscribe", data)
      .then((res) => {
        this.setState({
          emailSent: true,
          replyText: "Thank's for subscribing!",
          isLoading: false,
        });
        if (res.status === 422) {
          this.setState({
            emailSent: true,
            replyText: "You're already subscribed!",
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          emailSent: true,
          replyText: "Error subscribing. Please try again later.",
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <div className="overall-subscribe">
        <input
          type="email"
          placeholder="Email"
          className="inputtextbox"
          onChange={(e) => {
            this.setState({ email: e.target.value });
          }}
          value={this.state.email}
        />
        <div className="spacer_xs"></div>
        {this.state.isLoading ? (
          <div>
            <br />
            <div id="spinner"></div>
          </div>
        ) : (
          <input
            className="booknowbutton"
            type="button"
            value="Subscribe"
            onClick={this.handleSubscribe}
          />
        )}
        {this.state.emailSent ? (
          <div>
            <div className="spacer_s"></div>
            {this.state.replyText}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Subscribe;
