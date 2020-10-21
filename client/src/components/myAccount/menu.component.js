import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Matches from "../matches/matches.component"
import './menu.css'

export default class LeftMenu extends Component {
  constructor() {
    super()
    this.state = {
      activeItem: 'profile',
      //render: ' '
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, { name }, compName) {
    this.setState({ activeItem: name, render: compName})
  }

  _renderSubComp() {
    switch(this.state.render) {
      case 'matches': return <Matches />
      default: console.log('not matches')
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <div className='container'>
        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              <Menu.Item
                name='profile'
                active={activeItem === 'profile'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='explore'
                active={activeItem === 'explore'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='my listings'
                active={activeItem === 'my listings'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='settings'
                active={activeItem === 'settings'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={13}>
            <Segment>
              //add conditional render for components
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
