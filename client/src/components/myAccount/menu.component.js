import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Questionnaire from "../matches/questionnaire.component"
import Profile from "./profile.component"
import Settings from "./settings.component"

export default class LeftMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'profile',
      render: 'profile',
      userID: props.userID
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, { name , compname }) {
    this.setState({ activeItem: name, render: compname})
  }

  _renderSubComp() {
    switch(this.state.render) {
      case 'profile':
        return (
          <div>
            <Profile />
            <Questionnaire userId={this.state.userID}/>
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
              onClick={this.handleItemClick}
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
