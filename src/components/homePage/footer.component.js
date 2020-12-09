import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class navbar extends Component {
  render() {
    return (
      <footer>
        <div className="footer-content">

        	<div className="footer-social-media wow fadeInUp" data-wow-delay="0.2s">
        		<a href="https://www.linkedin.com/company/vhomesgroup"><img src="./images/linkedin.png" alt="" /></a>
        		<a href="https://www.facebook.com/rentvhomes/" ><img src="./images/facebook.png" alt="" /></a>
            <a href="https://www.instagram.com/vhomesgroup/" ><img src="./images/instagram.png" alt="" /></a>
        	</div>
          <div className="spacer_xs"></div>
          <NavLink to="/contact" className="wow fadeInUp" data-wow-delay="0.2s">Contact Us</NavLink>
          <h5 className="wow fadeInUp" data-wow-delay="0.2s">© 2020 Vhomes - All Rights Reserved. </h5>
        </div>
      </footer>
    );
  }
}

export default navbar;
