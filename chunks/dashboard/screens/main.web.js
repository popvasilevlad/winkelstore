import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import Menu from '../components/menu/';
import Products from './tabs/products';
import Dashboard from './tabs/dashboard';
import Inventory from './tabs/inventory';
import Profile from './tabs/profile';

export default class DashboardScreen extends Screen {
  constructor (props) {
    super(props)
    this.state = {...this.state,
      activeTab: 'products'
    }
  }

  handleTabChange = (tab) => {
    this.setState({
      activeTab: tab
    })
  }

  render () {

    return (
      <div className="dashboard-body">
        <Menu
          activeTab={this.state.activeTab}
          handleTabChange={this.handleTabChange}
        />
        <br/>
        {
          this.state.activeTab === 'dashboard' ?
          <Dashboard />
          :
          this.state.activeTab === 'products' ?
            <Products />
            :
            this.state.activeTab === 'inventory' ?
            <Inventory />
            :
            <Profile />
        }

      </div>
    )
  }
}
