import React, { Component } from 'react'
import './css/animate.css'
import './css/common.css'
import './css/grid.css'
import './css/homepage.css'
import illustration from './images/illustration.svg'

class newHome extends Component {
  render() {
    return (
      <div data-spy="scroll" data-target=".navbar-collapse" data-offset="50">

        <div className="spacer_xxl"></div>
        <div className="container_l">
          <div className="row gap large" >
        <div className="col-sm-12 col-md-8 col-lg-7" >
           <div className=" wow fadeInUp" data-wow-delay="0.5s">
            <img src={illustration} alt="" className="media-image" />
          </div>
        </div>

        <div className="col-sm-12 col-md-8 col-lg-5" >
          <div className="spacer_l"></div>
           <div className=" wow fadeInUp" data-wow-delay="0.5s">
          <h1>VHomes</h1>
          <div className="intro_text">The future of flexible rentals.</div>
        </div>

          <div className="spacer_m"></div>
          <div className=" wow fadeInUp" data-wow-delay="0.5s">
          <div className="login_bar">
           <input type="text" className="login" />
              <span className="subscribe_button" onclick="subscribeOnClick()">Subscribe</span>
              <span className="subscribing"></span>
              <span className="thanks"> Thank you! You have been subscribed</span>
          </div>
         <div className="intro_text">Subscribe now to get notified when we launch. </div>
        </div>
        </div>
        </div>
        </div>

      </div>
    )
  }
}

export default newHome
