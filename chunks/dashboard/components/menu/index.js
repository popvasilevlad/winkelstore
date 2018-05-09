import React, { PureComponent } from 'react'
import { Data } from 'react-chunky'
import MenuItem from './menu-item';

export default class Menu extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      activeTab: 'Dashboard'
    }
  }

  handleClick = (tab) => {
    this.setState({
      activeTab: tab
    });
  }

  signOut() {
      Data.Cache.clearCachedItem('userData')
      .then(() => {
          window.location = '/'
      })
      .catch( err => {
          console.log(err)
      })
  }

  render() {
    return (
      <div className="dashboard-menu">
        <MenuItem
              text="Dashboard"
              activeTab={this.state.activeTab}
              handleClick={this.handleClick}
            />
        <MenuItem
          text="Products"
          activeTab={this.state.activeTab}
          handleClick={this.handleClick}
        />
        <MenuItem
          text="Inventory"
          activeTab={this.state.activeTab}
          handleClick={this.handleClick}
          />
          <div
          style={{marginLeft:'auto'}}>
            <MenuItem
            text="Profile"
            activeTab={this.state.activeTab}
            handleClick={this.handleClick}
            />
            <MenuItem
            text="Log out"
            activeTab={this.state.activeTab}
            handleClick={this.signOut}
            />
          </div>
      </div>
    )
  }
}
