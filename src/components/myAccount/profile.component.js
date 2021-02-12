import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/actions/userActions";
import { app } from "../../utils/axiosConfig.js";
import { NavLink } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const Profile = () => {
  const loginInfo = useSelector((state) => state.Login);
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const isEmpty = Object.keys(user).length === 0;

  useEffect(() => {
    const userId = loginInfo.userInfo.session.userId;
    app.get(`/user/getUserInfo/${userId}`).then((res) => {
      dispatch(setUserInfo(res.data));
    });
  }, [dispatch, loginInfo.userInfo.session.userId]);

  const Greeting = () => {
    if (!isEmpty) {
      return (
        <h2 style={{ color: "#02b188", textDecoration: "none" }}>
          Welcome, {user.userInfo.name}!
        </h2>
      );
    } else {
      return null;
    }
  };

  const Information = () => {
    if (!isEmpty) {
      return (
        <>
          <div className="profile-email">
            <MailOutlineIcon /> {user.userInfo.email}
          </div>
          <div className="profile-desc-container">
            {user.userInfo.description ? (
              <p>
                <span>Description:</span> {user.userInfo.description}
              </p>
            ) : (
              <h4>Add your description to get started!</h4>
            )}
          </div>
        </>
      );
    } else {
      return <div>Add your description to get started!</div>;
    }
  };

  return (
    <div className="account-content">
      <div className="profile-content">
        <div className="profile-header">
          <Greeting />
          <div className="profile-line"></div>
        </div>

        <Information />

        <form action="/EditProfileInfo">
          <button className="btn green edit-profile-btn"> Edit Profile </button>
        </form>
        {/* <NavLink className="profile-roommate-form" to="/Questionnaire">
          <p>Roommate Preference Form</p>
        </NavLink> */}
      </div>
    </div>
  );
};

export default Profile;
