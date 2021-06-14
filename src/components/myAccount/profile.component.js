import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/actions/userActions";
import { app } from "../../utils/axiosConfig.js";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import { submitImageChange } from "../../redux/actions/userActions";

const Profile = (props) => {
  const loginInfo = useSelector((state) => state.Login);
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const isEmpty = Object.keys(user).length === 0;
  const [newProfileImg, setNewProfileImg] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfileImg(e.target.files[0]);
    }
  };

  const submitImageChange = () => {
    let profileImg = new FormData();
    profileImg.append("image", newProfileImg);

    props.submitImageChange(props.userInfo._id, profileImg);
    setNewProfileImg(null);
  };

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
          {props.loading ? (
            <h1>Loading</h1>
          ) : (
            <>
              <div
                style={{ height: "10rem", marginTop: "1rem", width: "10rem" }}
              >
                <img
                  src={
                    newProfileImg
                      ? URL.createObjectURL(newProfileImg)
                      : user.userInfo.profileImg
                  }
                  alt="Profile Img"
                  style={{ height: "inherit", width: "inherit" }}
                />
              </div>
              <div>
                <input
                  type="file"
                  name="profileImg"
                  onChange={handleImageChange}
                />
                <button onClick={() => setNewProfileImg(null)}>Clear</button>
                <button onClick={submitImageChange}>Save</button>
              </div>
            </>
          )}
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

const mapStateToProps = (state) => {
  let stateToReturn = { ...state };
  if (state.User.userInfo) stateToReturn.userInfo = state.User.userInfo;
  if (state.Loading.loading) stateToReturn.loading = state.Loading.loading;
  return stateToReturn;
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitImageChange: (...args) => dispatch(submitImageChange(...args)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
