import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class EditListing extends Component {
    render() {
        return (
            <div>
                <p>Edit listing temp</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    if (state.Login.userInfo) return {
        userListings: state.Listing.userListings,
        userSession: state.Login.userInfo.session,
    }
    return {
        userListings: state.Listing.userListings,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(
    EditListing
));
