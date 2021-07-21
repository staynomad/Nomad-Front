import React from "react";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import handleReq from "../../utils/fetchRequest";


const Settings = (props) => {
  let localIsHost = props.User.userInfo.isHost;
  const userId= props.User.userInfo._id;
  console.log(localIsHost)
  
  
  const changeHostStatus = async () => {
    localIsHost = !localIsHost;
    const url = '/user/setUserInfo/' + userId;
    const body = {};
    const data = {isHost: localIsHost};
    console.log(data)

    let res = await handleReq(url, "POST", body, data);
    if (res.status === 200) {
      window.location = "/MyAccount";
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

export default connect(mapStateToProps)(Settings);