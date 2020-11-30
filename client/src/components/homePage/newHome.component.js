
import React from 'react'
import { Link } from 'react-router-dom'
import Search from './search.component'

const newHome = ({isBlurred}) => {

  return (
    <div style={isBlurred ? {filter: 'blur(5px)'} : {}}>
    <div data-spy="scroll" data-target=".navbar-collapse" data-offset="50">

      <div className="spacer_xxl"></div>
      <div className="container_l">

        <div className="row gap large" >
      <div className="col-sm-12 col-md-8 col-lg-7" >
          <div className=" wow fadeInUp" data-wow-delay="0.5s">
          <img src="./images/illustration.svg" alt="illustration" className="media-image" />
        </div>
      </div>

      <div className="col-sm-12 col-md-8 col-lg-5" >
          <div className="spacer_l"></div>
            <div className=" wow fadeInUp" data-wow-delay="0.5s">
          <h1>VHomes</h1>
          <div className="intro_text">The future of flexible rentals.</div>
        </div>

          <div className="spacer_s"></div>
          <div className=" wow fadeInUp" data-wow-delay="0.5s">
          <Search />
          <div className="spacer_xs"></div>
          <div className="intro_text">Search now to find your next dream vacation. </div>
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
                <img src="./images/payment.svg" alt="payment"  className="why-graphic" />
              </div>
                <div className=" wow fadeInUp" data-wow-delay="0.5s">
                  <div className="subtitle">No more overpaying</div>
                  <p>We are committed to finding you the best deal. With VHomes you'll find the best stay possible for less than $60 per room per night. </p>
                  </div>
                </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-4 " >
                    <div className="home-card">
                      <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <img src="./images/space.svg" alt="space" className="why-graphic" />
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
                        <img src="./images/safety.svg" alt="safety" className="why-graphic" />
                      </div>
                      <div className=" wow fadeInUp" data-wow-delay="0.5s">
                        <div className="subtitle">Prioritize your safety</div>
                  <p>Our homes meet CDC standards. Our average turnover is 3 months—unlike hotels which churn & churn. And, yes, we offer single family homes and self check in.</p>
                </div>
              </div>
            </div>
      </div>
      </div>


      <div className="spacer_xxl"></div>
      <div className="container_wide">
        <div className="design">
        <h2 className="wow fadeInUp" data-wow-delay="0.5s">Our amenities</h2>
          <div className="spacer_l"></div>
        <div className="row gap large " >
            <div className="col-sm-6 col-md-6 col-lg-3" >
          <div className=" wow fadeInUp" data-wow-delay="0.5s">
              <img src="./images/wifi.svg" alt="wifi" className="AM-graphic "  />
              <div className="subtitle2">Fast wifi</div>
          </div>
          </div>

          <div className="col-sm-6 col-md-6 col-lg-3" >
                <div className=" wow fadeInUp" data-wow-delay="0.5s">
            <img src="./images/laundry.svg" alt="laundry" className="AM-graphic"  />
              <div className="subtitle2">In-suite laundry</div>
          </div>
        </div>


          <div className="col-sm-6 col-md-6 col-lg-3" >
              <div className=" wow fadeInUp" data-wow-delay="0.5s">
            <img src="./images/shower.svg" alt="shower" className="AM-graphic"  />
              <div className="subtitle2">Shower amenities</div>
          </div>
        </div>

          <div className="col-sm-6 col-md-6 col-lg-3" >
                <div className=" wow fadeInUp" data-wow-delay="0.5s">
            <img src="./images/kitchen.svg" alt="kitchen" className="AM-graphic"  />
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
            <img src="./images/step.png" alt="step" className="media-image" />
      </div>


      <div className="col-sm-12 col-md-6 col-lg-6" >
        <div className="spacer_l"></div>
        <div className="flex-card-container">
      <div className="number">
        <div className="number-sec">1</div>
        </div>
      &nbsp;
        <div className="subtitle">Search for a location</div>
          <p>Find beautiful properties from hosts all over the world. Can't decide where you want to go? Hit "Explore" and discover some of our most popular stays. </p>
          </div>

      <div className="spacer_s"></div>

        <div className="flex-card-container">
      <div className="number">
        <div className="number-sec">2</div>
        </div>
      &nbsp;
        <div className="subtitle">Browse recommended stays</div>
          <p>Booking a vacation has never been so easy. We tailor search results specifically to your liking and make it easy for you to find you dream stay. </p>
          </div>

      <div className="spacer_s"></div>

            <div className="flex-card-container">
      <div className="number">
        <div className="number-sec">3</div>
        </div>
      &nbsp;
        <div className="subtitle">Save your money </div>
          <p>We guarantee that you'll never pay more than $60 per room per night. On top of that, use our roommate feature to meet new people and split the cost! </p>
          </div>

      </div>
      </div>
      </div>


      <div className="spacer_xl"></div>
        <div className=" wow fadeInUp" data-wow-delay="0.5s">
      <h2>From our guests  </h2>
      </div>

        <div className=" wow fadeInUp" data-wow-delay="0.5s">
      <div className="testimonial-reel">
        <div>
          <div className="box">
            <figure className="image">
              <img className="img-fluid rounded-circle" src="./images/woman.png" alt="woman"/>
            </figure>

            <div className="test-component">
              <article className="test-title">
                  <div>Dalia</div>
              </article>
              <article className="test-content">
                <p className="quote">
                  It's a great place to stay!! Close to everything, clean, and great value.
                </p>
                <div className="spacer_xxs">June 2020</div>
              </article>
            </div>
          </div>
        </div>
        <div>

          <div className="box">
            <figure className="image">
              <img className="img-fluid rounded-circle" src="./images/man.png" alt="man"/>
            </figure>
            <div className="test-component">
              <article className="test-title">
                <div> Larry</div>
              </article>
              <article className="test-content">
                <p className="quote">
                  Our family would like to first and foremost thank you for making us feel safe and comfortable.
                </p>
                <div className="spacer_xxs">June 2020</div>
              </article>
            </div>
          </div>
        </div>

      </div>
      </div>


      <div className="spacer_xl"></div>
        <div className=" wow fadeInUp" data-wow-delay="0.5s">
      <h2>Want to host your property?</h2>
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

export default newHome;
