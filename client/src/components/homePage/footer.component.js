import React, { Component } from 'react'
import './css/animate.css'
import './css/common.css'
import './css/grid.css'
import './css/homepage.css'
import logo from './images/logo.png'
import facebook from './images/facebook.png'
import ig from './images/instagram.png'
import linkedin from './images/linkedin.png'

class navbar extends Component {
  render() {
    return (
      <footer>
        <div className="footer-content">
        	<div className="footer-social-media wow fadeInUp" data-wow-delay="0.4s">
        		<a href="" target="_blank"><img src={linkedin} alt="" /></a>
        		<a href="" ><img src={facebook} alt="" /></a>
            <a href="" ><img src={ig} alt="" /></a>
        	</div>
          <h5 className="wow fadeInUp" data-wow-delay="0.4s">© 2020 Vhomes- All Rights Reserved. </h5>
        </div>
      </footer>
    )
  }
}

export default navbar
