import React, { Component } from "react";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import handleReq from "../../utils/fetchRequest";
import { setHost } from "../../redux/actions/authActions";
import "./settings.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localIsHost: props.User.userInfo.isHost,
    };
  }

  changeHostStatus = async () => {
    this.state.localIsHost = !this.state.localIsHost;
    const userId = this.props.User.userInfo._id;
    const url = "/user/setUserInfo/" + userId;
    const body = {};
    const data = { isHost: this.state.localIsHost };
    let res = await handleReq(url, "POST", body, data);
    if (res.status === 200) {
      this.props.setHost(
        this.state.localIsHost,
        this.props.User.userInfo.token,
        userId,
        this.props.User.userInfo.user
      );
      console.log(this.props.User.userInfo.isHost);
    }
  };

  render() {
    if (this.state.localIsHost === false) {
      return (
        <div className="host-toggle-container">
          <p>Switch to Host</p>
          <Switch
            checked={this.state.localIsHost}
            onChange={this.changeHostStatus}
          />
        </div>
      );
    } else {
      return (
        <div className="host-toggle-container">
          <p>Switch to Non-Host</p>
          <Switch
            checked={this.state.localIsHost}
            onChange={this.changeHostStatus}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const stateToReturn = { ...state };
  if (state.User.userInfo) stateToReturn["userInfo"] = state.User.userInfo;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setHost: (isHost, token, userId, user) =>
      dispatch(setHost(isHost, token, userId, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
