import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Search from "./search.component";
import Subscribe from "./subscribe.component";
import FeaturedListings from "./featuredListings.component"
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5%",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "auto",
    height: "auto",
  },
}));

const NewHome = (props) => {
  const { isBlurred, history } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!props.userSession && !isMobile && !localStorage.getItem('popupSeen')) {
      setTimeout(() => {
        setOpen(true);
        localStorage.setItem('popupSeen', true)
      }, 1000);
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={isBlurred ? { filter: "blur(5px)" } : {}}>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2>Subscribe to our mailing list</h2>
              <p className="subscribe-text">
                Sign up now to get our latest news. You won't regret it.
              </p>
              <Subscribe />
            </div>
          </Fade>
        </Modal>
      </div>

      <div data-spy="scroll" data-target=".navbar-collapse" data-offset="50">
        <div className="spacer_xxl"></div>
        <div className="container_l">
          <div className="row gap large row-one">
            <div className="col-sm-12 col-md-8 col-lg-7">
              <div className=" wow fadeInUp" data-wow-delay="0.5s">
                <img
                  src="./images/illustration.svg"
                  alt="illustration"
                  className="media-image"
                />
              </div>
            </div>

            <div className="search-container">
              <div className="search-header wow fadeInUp" data-wow-delay="0.5s">
                <h1 className="search-logo">NomΛd</h1>
                <div className="intro_text">
                  The future of flexible rentals.
                </div>
              </div>

              <div className=" wow fadeInUp" data-wow-delay="0.5s">
                <Search history={history} />
                <div className="intro_text">
                  Find your dream stay without breaking the bank.{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="spacer_xs"></div>
          <div className="container">
            <h1 className="why-title wow fadeInUp" data-wow-delay="0.5s">
              Why NomΛd?
            </h1>

            <div className="why-container row gap large">
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="home-card">
                  <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <img
                      src="./images/payment.svg"
                      alt="payment"
                      className="why-graphic"
                    />
                  </div>
                  <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <div className="subtitle">No more overpaying</div>
                    <p className="why-caption">
                      We are committed to finding you the best deal. With NomΛd
                      you'll find the best stay possible for less than $60 per
                      room per night.{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="home-card">
                  <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <img
                      src="./images/space.svg"
                      alt="space"
                      className="why-graphic"
                    />
                  </div>
                  <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <div className="subtitle">Spaces designed for living</div>
                    <p className="why-caption">
                      Every property is ideal for both working and relaxing. Our
                      spaces have high-speed WiFi, artisan coffee, and everyday
                      amenities.{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="home-card">
                  <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <img
                      src="./images/safety.svg"
                      alt="safety"
                      className="why-graphic"
                    />
                  </div>
                  <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <div className="subtitle">Prioritize your safety</div>
                    <p className="why-caption">
                      Our homes meet CDC standards. Our average turnover is 3
                      months—unlike hotels which churn & churn. And, yes, we
                      offer single family homes and self check in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="spacer_xl"></div>
          <div className="container_wide">
            <div className="design">
              <h1
                className="amenities-header wow fadeInUp"
                data-wow-delay="0.5s"
              >
                Our Amenities
              </h1>
              <div className="spacer_l"></div>
              <div className="row gap large ">
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <img
                      src="./images/wifi.svg"
                      alt="wifi"
                      className="AM-graphic "
                    />
                    <div className="subtitle2">Fast wifi</div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <img
                      src="./images/laundry.svg"
                      alt="laundry"
                      className="AM-graphic"
                    />
                    <div className="subtitle2">In-suite laundry</div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <img
                      src="./images/shower.svg"
                      alt="shower"
                      className="AM-graphic"
                    />
                    <div className="subtitle2">Shower amenities</div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className=" wow fadeInUp" data-wow-delay="0.5s">
                    <img
                      src="./images/kitchen.svg"
                      alt="kitchen"
                      className="AM-graphic"
                    />
                    <div className="subtitle2">Fully-equipped kitchen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <h1 className="book-header">Book and Save Your Money </h1>
            <div className="spacer_l"></div>
            <div className="book-container row gap large">
              <div className="col-sm-12 col-md-6 col-lg-6">
                <img
                  src="./images/step.png"
                  alt="step"
                  className="media-image book-image"
                />
              </div>

              <div className="col-sm-12 col-md-6 col-lg-6">
                <div className="spacer_xl"></div>
                <div className="flex-card-container">
                  <div className="book-header-container">
                    <div className="number">
                      <div className="number-sec">1</div>
                    </div>
                    &nbsp;
                    <div className="subtitle">Search for a location</div>
                  </div>
                  <p className="book-caption">
                    Find beautiful properties from hosts all over the world.
                    Can't decide where you want to go? Hit "Explore" and
                    discover some of our most popular stays.{" "}
                  </p>
                </div>

                <div className="spacer_s"></div>

                <div className="flex-card-container">
                  <div className="book-header-container">
                    <div className="number">
                      <div className="number-sec">2</div>
                    </div>
                    &nbsp;
                    <div className="subtitle">Browse recommended stays</div>
                  </div>
                  <p className="book-caption">
                    Booking a vacation has never been so easy. We tailor search
                    results specifically to your liking and make it easy for you
                    to find you dream stay.{" "}
                  </p>
                </div>

                <div className="spacer_s"></div>

                <div className="flex-card-container">
                  <div className="book-header-container">
                    <div className="number">
                      <div className="number-sec">3</div>
                    </div>
                    &nbsp;
                    <div className="subtitle">Save your money </div>
                  </div>
                  <p className="book-caption">
                    We guarantee that you'll never pay more than $60 per room
                    per night. On top of that, use our roommate feature to meet
                    new people and split the cost!{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="spacer_l"></div>
          <div className=" wow fadeInUp" data-wow-delay="0.5s">
            <h1 className="quotes-title">From our guests </h1>
          </div>

          <div className=" wow fadeInUp" data-wow-delay="0.5s">
            <div className="testimonial-reel">
              <div className="box">
                <figure className="image">
                  <img
                    className="img-fluid rounded-circle"
                    src="./images/woman.png"
                    alt="woman"
                  />
                </figure>

                <div className="test-component">
                  <article className="test-title">
                    <div>Dalia</div>
                  </article>
                  <article className="test-content">
                    <p className="quote">
                      It's a great place to stay!! Close to everything, clean,
                      and great value.
                    </p>
                    <div className="spacer_xxs quote-date">June 2020</div>
                  </article>
                </div>
              </div>

              <div className="box">
                <figure className="image">
                  <img
                    className="img-fluid rounded-circle"
                    src="./images/man.png"
                    alt="man"
                  />
                </figure>
                <div className="test-component">
                  <article className="test-title">
                    <div> Larry</div>
                  </article>
                  <article className="test-content">
                    <p className="quote">
                      Our family would like to first and foremost thank you for
                      making us feel safe and comfortable.
                    </p>
                    <div className="spacer_xxs quote-date">June 2020</div>
                  </article>
                </div>
              </div>
            </div>
          </div>

          <div className="spacer_m"></div>
          <div className=" wow fadeInUp" data-wow-delay="0.5s">
            <h2 className="host-header">Want to host your property?</h2>
          </div>
          <div className=" wow fadeInUp" data-wow-delay="0.5s">
            <div className="button3">
              <Link to="/createListing">
                <button className="btn-hover color-5 create-listing-button">
                  Create a Listing
                </button>
              </Link>
              <div className="spacer_m"></div>
              <h2 className="subscribe-header">
                Subscribe to our mailing list
              </h2>
              <p className="subscribe-text">
                Subscribe to our mailing list to get our latest news.
              </p>
              <Subscribe />
            </div>
          </div>

          <div className="spacer_l"></div>
          <FeaturedListings />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const stateToReturn = { ...state };
  if (state.Login.userInfo)
    stateToReturn["userSession"] = state.Login.userInfo.session;
  return stateToReturn;
};

export default withRouter(connect(mapStateToProps)(NewHome));
