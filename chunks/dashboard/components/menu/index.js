import React, { PureComponent } from 'react'
import { Data } from 'react-chunky'
import MenuItem from './menu-item';

export default class Menu extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      activeTab: props.activeTab
    }
  }

  handleClick = (tab) => {
    this.setState({
      activeTab: tab
    });
    this.props.handleTabChange(tab);
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
              text="dashboard"
              activeTab={this.state.activeTab}
              handleClick={this.handleClick}
            />
        <MenuItem
          text="products"
          activeTab={this.state.activeTab}
          handleClick={this.handleClick}
        />
        <MenuItem
          text="inventory"
          activeTab={this.state.activeTab}
          handleClick={this.handleClick}
          />
          <div
          style={{marginLeft:'auto'}}>
            <MenuItem
            text="profile"
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
