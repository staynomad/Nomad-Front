import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Matches from "../matches/matches.component"
import Questionnaire from "../matches/questionnaire.component"
import Listings from "../matches/listing/listings.component"
import Profile from "./profile.component"
import Explore from './explore.component'
import Settings from "./settings.component"

export default class LeftMenu extends Component {
  constructor() {
    super()
    this.state = {
      activeItem: 'profile',
      render: 'profile'
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, { name , compname }) {
    this.setState({ activeItem: name, render: compname})
    console.log(this.state)
  }

  _renderSubComp() {
    console.log(this.state)
    switch(this.state.render) {
      case 'profile':
        return <Profile />;
      case 'explore':
        return <Explore />;
      case 'my listings':
        console.log("in my listings")
        return <Listings />;
      case 'settings':
        return <Settings />;
      case 'matches': 
        return <Matches />;
      case 'roommate questionnaire':
        return <Questionnaire />;

      default:
        return <Matches />;
    }
  }

  render() {
    const { activeItem } = this.state

    return (
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
              name='explore'
              active={activeItem === 'explore'}
              compname='explore'
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='my listings'
              active={activeItem === 'my listings'}
              compname='my listings'
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='settings'
              active={activeItem === 'settings'}
              compname='settings'
              onClick={this.handleItemClick}
            />
            <Menu.Item 
              name='roommate questionnaire'
              active={activeItem === 'roommate questionnaire'}
              compname='roommate questionnaire'
              onClick={this.handleItemClick}
            />
            <Menu.Item 
              name='matches'
              active={activeItem === 'matches'}
              compname='matches'
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
    )
  }
}
