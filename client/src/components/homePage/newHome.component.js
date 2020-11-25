import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class newHome extends Component {

  render() {
    return (
      <div>

        <div data-spy="scroll" data-target=".navbar-collapse" data-offset="50">

          <div className="spacer_xxl"></div>
          <div className="container_l">

            <div className="row gap large" >
          <div className="col-sm-12 col-md-8 col-lg-7" >
             <div className=" wow fadeInUp" data-wow-delay="0.5s">
              <img src="./images/illustration.svg" alt="" className="media-image" />
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
               <input type="text" className="login" placeholder="city" />
                  <span className="subscribe_button" onclick="">Search</span>
              </div>
             <div className="intro_text">Subscribe now to get notified when we launch. </div>
            </div>
            </div>
          </div>


          <div className="spacer_xl"></div>
            <div className="container">
            <h2 className="wow fadeInUp" data-wow-delay="0.5s">Why VHomes?</h2>
              <div className="spacer_l"></div>

           <div className="row gap large" >
                     <div className="col-sm-12 col-md-12 col-lg-4 " >
                      <div className="home-card">
                       <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <img src="./images/payment.svg" alt=""  className="why-graphic" />
                  </div>
                   <div className=" wow fadeInUp" data-wow-delay="0.5s">
                     <div className="subtitle">No more overpaying</div>
                     <p>We are committed to finding you the best deal. Find roommates, split the price, and never spend more than $60 per night.</p>
                     </div>
                   </div>
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-4 " >
                       <div className="home-card">
                         <div className=" wow fadeInUp" data-wow-delay="0.5s">
                        <img src="./images/space.svg" alt="" className="why-graphic" />
                      </div>
                       <div className=" wow fadeInUp" data-wow-delay="0.5s">
                        <div className="subtitle">Spaces designed for living</div>
                     <p>Every property is ideal for both working and relaxing. Our spaces have high-speed WiFi, artisan coffee, and everyday amenities. </p>
                   </div>
                   </div>
                 </div>

                      <div className="col-sm-12 col-md-12 col-lg-4 " >
                         <div className="home-card">
                           <div className=" wow fadeInUp" data-wow-delay="0.5s">
                           <img src="./images/safety.svg" alt="" className="why-graphic" />
                         </div>
                          <div className=" wow fadeInUp" data-wow-delay="0.5s">
                           <div className="subtitle">Prioritize your safety</div>
                     <p>Our homes meet CDC standards. Our average turnover is 3 months—unlike hotels which churn & churn. And, yes, we offer single family homes and self check in.</p>
                    </div>
                  </div>
                </div>
          </div>
          </div>


          <div className="spacer_xl"></div>
          <div className="design">
            <div className="container">
            <h2 className="wow fadeInUp" data-wow-delay="0.5s">Our Amenities</h2>
              <div className="spacer_l"></div>
            <div className="row gap large " >
               <div className="col-sm-6 col-md-6 col-lg-3" >
              <div className=" wow fadeInUp" data-wow-delay="0.5s">
                  <img src="./images/wifi.svg" alt="" className="AM-graphic "  />
                  <div className="subtitle2">Fast Wifi</div>
              </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-3" >
                    <div className=" wow fadeInUp" data-wow-delay="0.5s">
                <img src="./images/laundry.svg" alt="" class="AM-graphic"  />
                  <div className="subtitle2">In-suite laundry</div>
              </div>
            </div>


              <div className="col-sm-6 col-md-6 col-lg-3" >
                 <div className=" wow fadeInUp" data-wow-delay="0.5s">
                <img src="./images/shower.svg" alt="" class="AM-graphic"  />
                  <div className="subtitle2">Shower amenities</div>
              </div>
            </div>

              <div className="col-sm-6 col-md-6 col-lg-3" >
                    <div className=" wow fadeInUp" data-wow-delay="0.5s">
                <img src="./images/kitchen.svg" alt="" class="AM-graphic"  />
                  <div className="subtitle2">Fully-equipped kitchen</div>
              </div>
            </div>
          </div>
            </div>
          </div>


          <div className="container">
            <div className="spacer_xl"></div>
               <h2>Find your ideal home in 3 steps </h2>
               <div className="spacer_l"></div>
              <div className="row gap large" >
          <div className="col-sm-12 col-md-6 col-lg-6" >
                <img src="./images/step.png" alt="" className="media-image" />
          </div>


          <div className="col-sm-12 col-md-6 col-lg-6" >
           <div className="spacer_l"></div>
            <div className="flex-card-container">
          <div className="number">
            <div className="number-sec">1</div>
           </div>
          &nbsp;
            <div className="subtitle">Look up a location</div>
             <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. </p>
              </div>

          <div className="spacer_s"></div>

            <div className="flex-card-container">
          <div className="number">
            <div className="number-sec">2</div>
           </div>
          &nbsp;
            <div className="subtitle">Browse recommended stays</div>
             <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. </p>
              </div>

          <div className="spacer_s"></div>

                <div className="flex-card-container">
          <div className="number">
            <div className="number-sec">3</div>
           </div>
          &nbsp;
            <div className="subtitle">Connect with roommates </div>
             <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. </p>
              </div>

          </div>
          </div>
          </div>


          <div className="spacer_xl"></div>
           <div className=" wow fadeInUp" data-wow-delay="0.5s">
          <h2>What Clients Said about VHomes?  </h2>
          </div>
           <div className=" wow fadeInUp" data-wow-delay="0.5s">
          <div className="button3">
          <button className="btn-hover color-5">Make a Testimonial</button>
          </div>
          </div>

           <div className=" wow fadeInUp" data-wow-delay="0.5s">
          <div className="testimonial-reel">
            <div>
              <div className="box">
                <figure className="image">
                  <img className="img-fluid rounded-circle" src="./images/woman.png" />
                </figure>

                <div className="test-component">
                  <article className="test-title">
                     <div>Dianne Russell</div>
                  </article>
                  <article className="test-content">
                    <p className="quote">
                      This home is great. The host was very responsive, place was nice and clean. Will definitely use again for sure.
                    </p>
                  </article>
                </div>
              </div>
            </div>
            <div>

              <div className="box">
                <figure className="image">
                  <img className="img-fluid rounded-circle" src="./images/man.png" />
                </figure>
                <div className="test-component">
                  <article className="test-title">
                    <div>Jacob Jones</div>
                  </article>
                  <article className="test-content">
                    <p className="quote">
                      This home is great. The host was very responsive, place was nice and clean. Will definitely use again for sure.
                    </p>
                  </article>
                </div>
              </div>
            </div>
            <div>

              <div className="box">
                <figure className="image">
                  <img className="img-fluid rounded-circle" src="./images/woman.png" />
                </figure>
              <div className="test-component">
                  <article className="test-title">
                    <div>  Jenny Wilson </div>
                  </article>
                  <article className="test-content">
                    <p className="quote">
                      This home is great. The host was very responsive, place was nice and clean. Will definitely use again for sure.
                    </p>
                  </article>
                </div>
              </div>
            </div>
            <div>

              <div className="box">
                <figure className="image">
                  <img className="img-fluid rounded-circle" src="./images/man.png" />
                </figure>
                <div className="test-component">
                  <article className="test-title">
                    <div> Ralph Edwards</div>
                  </article>
                  <article className="test-content">
                    <p className="quote">
                      This home is great. The host was very responsive, place was nice and clean. Will definitely use again for sure.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
          </div>


          <div className="spacer_xl"></div>
           <div className=" wow fadeInUp" data-wow-delay="0.5s">
          <h2>Want to Host Your Property?</h2>
          </div>
           <div className=" wow fadeInUp" data-wow-delay="0.5s">
          <div className="button3">
          <Link to="/createListing">
            <button className="btn-hover color-5">Create a Listing Now</button>
          </Link>
          </div>
          </div>


          <div className="spacer_xl"></div>

          </div>
        </div>
      </div>
    )
  }
}

export default newHome
