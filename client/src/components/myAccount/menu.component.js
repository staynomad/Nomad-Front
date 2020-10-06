import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default class LeftMenu extends Component {
  state = { activeItem: 'account' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Grid>
        <Grid.Column width={4}>
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
              name='my listings (only visible to renters)'
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

        <Grid.Column stretched width={12}>
          <Segment>
            component here
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
