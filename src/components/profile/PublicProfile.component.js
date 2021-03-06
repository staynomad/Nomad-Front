import React, { useEffect, useState } from "react";
import { app } from "../../utils/axiosConfig";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { searchUserListings } from "../../redux/actions/searchListingActions";
import "./PublicProfile.css";

import ProfileHorizontalScrollMenu from "../matches/listing/ProfileHorizontalScrollMenu.component";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const PublicProfile = (props) => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      await props.searchUserListings(props.match.params.id);
      app
        .get(`/user/getUserInfo/${props.match.params.id}`)
        .then((res) => {
          setName(res.data.name);
          setDescription(res.data.description);
          if (props.userSession) setEmail(res.data.email);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    };
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStars = () => {
    let totalReviews = 0;
    let totalStars = 0;
    const stars = [];
    props.userListings.forEach((listing) => {
      for (let props in listing.rating) {
        totalStars = totalStars + listing.rating[props].stars;
        totalReviews++;
      }
    });
    if (totalReviews === 0) {
      return <h3 className="public-profile-text">No reviews yet</h3>;
    }
    let average = totalStars / totalReviews;
    for (let i = 1; i <= 5; i++) {
      if (i <= average) {
        stars.push(<StarIcon className="star-icon" key={i} alt={i} />);
      } else {
        stars.push(<StarBorderIcon className="star-icon" key={i} alt={i} />);
      }
    }
    stars.push(
      <p className="rating-number" key={"num"}>
        ({totalReviews})
      </p>
    );

    return stars;
  };

  return (
    <div className="public-profile-screen">
      {!loading ? (
        <div className="public-profile-container">
          {!error ? (
            <>
              <div className="public-profile-header">
                <h2>{name}</h2>
              </div>
              <div className="public-profile-content">
                {props.userListings && (
                  <>
                    <div className="public-profile-caption-container">
                      <h1 className="public-profile-caption">Listings</h1>
                      <div className="public-profile-caption-line"></div>
                    </div>
                    <ProfileHorizontalScrollMenu
                      className="horizontal-scroll-container"
                      data={props.userListings}
                    />
                  </>
                )}
                {description && (
                  <>
                    <div className="public-profile-caption-container">
                      <h1 className="public-profile-caption">Description</h1>
                      <div className="public-profile-caption-line"></div>
                    </div>
                    <h3 className="public-profile-text">{description}</h3>
                  </>
                )}
                {/*only if user is logged in */}
                {email && (
                  <>
                    <div className="public-profile-caption-container">
                      <h1 className="public-profile-caption">Contact</h1>
                      <div className="public-profile-caption-line"></div>
                    </div>
                    <div className="public-profile-contact">
                      <MailOutlineIcon />
                      <h3 className="public-profile-text">{email}</h3>
                      <a href={`mailto:${email}`}>Contact Host</a>
                    </div>
                  </>
                )}
                <div className="public-profile-caption-container">
                  <h1 className="public-profile-caption">Reviews</h1>
                  <div className="public-profile-caption-line"></div>
                </div>
                <div className="public-profile-reviews-container">
                  {props.userListings && getStars()}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="public-profile-header"></div>
              <h2 style={{ marginBottom: "20rem" }}>Profile Not Found!</h2>
            </>
          )}
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  let stateToReturn = { ...state };
  if (state.Login.userInfo)
    stateToReturn["userSession"] = state.Login.userInfo.session;
  stateToReturn["userListings"] = state.Listing.userListings;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUserListings: (userId) => dispatch(searchUserListings(userId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PublicProfile)
);
