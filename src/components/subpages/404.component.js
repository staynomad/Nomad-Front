import React, { Component } from "react";

export default class PageNotFound extends Component {
  render() {
    return (
      <div className="col-sm-12 col-md-8 col-lg-7 container_s">
        <div className=" wow fadeInUp" data-wow-delay="0.5s">
          <img
            src="./images/error.svg"
            alt="404 Error"
            className="media-image"
          />
        </div>
      </div>
    );
  }
}
