import React, { useEffect, useState } from "react";
import { app } from "../../utils/axiosConfig";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./PublicProfile.css";

import { searchUserListings } from "../../redux/actions/searchListingActions";

const PublicProfile = (props) => {
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
        })
        .catch((err) => setError(true));
    };
    getInfo();
  }, []);
  console.log(props.userListings);

  return (
    <div className="public-profile-screen">
      <h1>test</h1>
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
