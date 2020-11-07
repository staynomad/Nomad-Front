import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import 'semantic-ui-css/semantic.min.css'
import Questionnaire from "../matches/questionnaire.component"
import Profile from "./profile.component"
import Settings from "./settings.component"
import { searchUserListings } from '../../redux/actions/searchListingActions';

class LeftMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'profile',
      render: 'profile',
      userID: props.userSession.userId
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, { name, compname }) {
    this.setState({ activeItem: name, render: compname })
  }

  _renderSubComp() {
    switch (this.state.render) {
      case 'profile':
        return (
          <div>
            <Profile />
            <Questionnaire userId={this.state.userID} />
          </div>
        );
      case 'my listings':
        return;
      case 'settings':
        return <Settings />;
      default:
        return;
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <br /><br /><br /><br /><br /> {/* can implement this more cleanly with styling */}
        <Grid className="container">
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              <Menu.Item
                name='profile'
                active={activeItem === 'profile'}
                compname='profile'
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='my listings'
                active={activeItem === 'my listings'}
                compname='my listings'
                onClick={(e, { name, compname }) => {
                  this.handleItemClick(e, { name, compname });
                  this.props.searchUserListings(this.props.userSession.token);
                }}
              />
              <Menu.Item
                name="renter dashboard"
                active={activeItem === 'renter dashboard'}
                compname="renter dashboard"
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='settings'
                active={activeItem === 'settings'}
                compname='settings'
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={13}>
            <Segment>
              {this._renderSubComp()}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  if (state.Login.userInfo) return {
    userSession: state.Login.userInfo.session,
  }
  return {
    userListings: state.Listing.userListings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchUserListings: (token) => dispatch(searchUserListings(token)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  LeftMenu
));