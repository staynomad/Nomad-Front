import React, { Component } from 'react'

class navbar extends Component {
  render() {
    return (
      <footer>
        <div className="footer-content">
        	<div className="footer-social-media wow fadeInUp" data-wow-delay="0.4s">
        		<a href="https://www.linkedin.com/company/vhomesgroup"><img src="./images/linkedin.png" alt="" /></a>
        		<a href="https://www.facebook.com/rentvhomes/" ><img src="./images/facebook.png" alt="" /></a>
            <a href="https://www.instagram.com/vhomesgroup/" ><img src="./images/instagram.png" alt="" /></a>
        	</div>
          <h5 className="wow fadeInUp" data-wow-delay="0.4s">© 2020 Vhomes - All Rights Reserved. </h5>
          <div className="spacer_xs"></div>
        </div>
      </footer>
    )
  }
}

export default navbar
