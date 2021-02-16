import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../../utils/axiosConfig.js";
import { setUserInfo } from "../../redux/actions/userActions";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import "./editProfile.css";
import "../createListing/createListing.css";

const EditProfileInfo = (props) => {
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.Login);
  // const user = useSelector(state => state.User)
  const [profileState, setProfileState] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const userId = loginInfo.userInfo.session.userId;
    app.get(`/user/getUserInfo/${userId}`).then((res) => {
      dispatch(setUserInfo(res.data));
      setProfileState({
        name: res.data.name,
        email: res.data.email,
        isHost: res.data.isHost,
        description: "",
        image: "",
      });
    });
  }, [dispatch, loginInfo.userInfo.session.userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = loginInfo.userInfo.session.userId;
    loginInfo.userInfo.session.isHost = profileState.isHost;
    // route to update user information
    app
      .post(`/user/setUserInfo/${userId}`, profileState)
      .then((res) => {
        // updates redux store
        dispatch(setUserInfo(res.data));
        setSubmitted(!submitted);
      })
      .catch((res) => {
        alert("Unable to edit profile.");
      });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setProfileState({ ...profileState, [event.target.name]: value });
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-content-container">
        <div className="edit-profile-header">
          <NavLink to="/MyAccount">
            <KeyboardBackspaceIcon className="edit-profile-back-icon" />
          </NavLink>
          <h2 style={{ color: "#02b188", textDecoration: "none" }}>
            Edit Profile
          </h2>
        </div>
        {submitted ? (
          <p className="edit-profile-recorded">
            Your new profile information has been recorded!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <label id="name" value={profileState.name}>
              <div className="editProfileLabel">Write your name: </div>
              <input
                className="editProfileInput"
                type="text"
                id="profileInfoName"
                name="name"
                value={profileState.name}
                onChange={handleChange}
              />
            </label>
            <label id="email" value={profileState.email}>
              <div className="editProfileLabel">Write your email: </div>
              <input
                className="editProfileInput"
                type="text"
                id="profileInfoEmail"
                name="email"
                value={profileState.email}
                onChange={handleChange}
              />
            </label>

            <label id="description" value={profileState.description}>
              <div className="editProfileLabel">
                Write a description about yourself:
              </div>
              <textarea
                className="descriptionTextInputBox"
                id="profileInfoDescription"
                name="description"
                placeholder={profileState.description}
                onChange={handleChange}
                rows="5"
                maxLength="700"
              />
            </label>
            <label id="isHost" value={profileState.isHost}>
              <div className="editProfileLabel">
                Are you a host?
                {profileState.isHost ? (
                  <CheckBoxIcon
                    className="edit-profile-checkbox"
                    onClick={() =>
                      setProfileState({
                        ...profileState,
                        isHost: !profileState.isHost,
                      })
                    }
                  />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    className="edit-profile-checkbox"
                    onClick={() =>
                      setProfileState({
                        ...profileState,
                        isHost: !profileState.isHost,
                      })
                    }
                  />
                )}
              </div>
            </label>
            {/*<label id="image" value={profileState.image}>
                    <t>Choose a profile image: </t>
                    <input
                        type="file"
                        id="profileInfoImage"
                        name="image"
                        placeholder={profileState.image}
                        onChange={handleChange}
                    />
                </label>*/}
            {submitted ? null : (
              <button type="submit" className=" edit-profile-submit">
                Click here to submit your new profile information!
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfileInfo;
