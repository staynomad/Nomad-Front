import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";

class navbar extends Component {
  render() {
    return (
      <footer>
        <div className="footer-content">
          <div
            className="footer-social-media wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <a
              className="footer-icon-circle"
              href="https://www.linkedin.com/company/vhomesgroup"
            >
              <img
                className="footer-icon"
                src="/images/linkedin.svg"
                alt="linkedin"
              />
            </a>

            <a
              className="footer-icon-circle"
              href="https://www.facebook.com/rentvhomes/"
            >
              <img
                className="footer-icon"
                src="/images/facebook.svg"
                alt="facebook"
              />
            </a>
            <a
              className="footer-icon-circle"
              href="https://www.instagram.com/vhomesgroup/"
            >
              <img
                className="footer-icon"
                src="/images/instagram.svg"
                alt="instagram"
              />
            </a>
          </div>
          <div className="spacer_xs"></div>
          <NavLink
            to="/contact"
            className="wow fadeInUp footer-item"
            data-wow-delay="0.2s"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/about"
            className="wow fadeInUp footer-item"
            data-wow-delay="0.2s"
          >
            About Us
          </NavLink>
          <h5 className="wow fadeInUp" data-wow-delay="0.2s">
            © 2021 NomΛd - All Rights Reserved.
          </h5>
        </div>
      </footer>
    );
  }
}

export default navbar;
