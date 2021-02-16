import React from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

class LandingPageCL extends React.Component {
  componentDidMount() {
    this.props.completeForm();
  }
  render() {
    return (
      <div className="create-listing-header">
        <NavLink className="create-listing-back" to="/MyAccount">
          <KeyboardBackspaceIcon />
        </NavLink>
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
const mapDispatchToProps = (dispatch) => {
  return {
    completeForm: () => dispatch(completeForm()),
    incompleteForm: () => dispatch(incompleteForm()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LandingPageCL)
);
