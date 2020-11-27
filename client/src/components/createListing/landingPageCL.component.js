import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class LandingPageCL extends React.Component {
  render() {
    return (
      <div>
        <h1 className="startText">Get Started!</h1>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  if (state.Login.userInfo)
    return {
      listingData: state,
      userSession: state.Login.userInfo.session,
    };
  return {
    listingData: state,
  };
};

export default withRouter(connect(mapStateToProps, null)(LandingPageCL));
