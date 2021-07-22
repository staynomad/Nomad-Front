import React from "react";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import handleReq from "../../utils/fetchRequest";
import {setHost} from "../../redux/actions/authActions";
import './settings.css'

const Settings = (props) => {
  let localIsHost = props.User.userInfo.isHost;
  const userId= props.User.userInfo._id;
  
  
  const changeHostStatus = async () => {
    localIsHost = !localIsHost;
    const url = '/user/setUserInfo/' + userId;
    const body = {};
    const data = {isHost: localIsHost};

    let res = await handleReq(url, "POST", body, data);
    if (res.status === 200) {
      props.setHost(localIsHost, props.User.userInfo.token, userId, props.User.userInfo.user);
      console.log(props.User.userInfo.isHost);
      window.location.reload();
    }
  };
  return (
    <div>
        <p>Switch to host</p>
        <Switch
          checked={localIsHost}
          onChange={changeHostStatus}
        />
      </div>
  );
};

const mapStateToProps = (state) => {
  const stateToReturn = { ...state };
  if (state.User.userInfo)
    stateToReturn["userInfo"] = state.User.userInfo;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setHost:(isHost, token, userId, user) =>
      dispatch(setHost(isHost, token, userId, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);