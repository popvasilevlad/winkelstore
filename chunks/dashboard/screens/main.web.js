import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import { Data } from 'react-chunky'
import Menu from '../components/menu/';

export default class DashboardScreen extends Screen {
  constructor (props) {
    super(props)
    this.state = {...this.state,
      loading: true
    }
  }

  componentDidMount () {
    super.componentDidMount()
    this.getUserData();
  }

  getUserData = () => {
    Data.Cache.retrieveCachedItem('userData')
    .then(data => {
      this.setState({
        data,
        loading: false
      })
    })
    .catch( () => {
        window.location = '/'
    });
  }

  render () {
    if (this.state.loading) return (<div><br/><br/>Loading</div>)

    return (
      <div className="dashboard-body">
        <Menu
          activeTab="dashboard"
        />
        <br/>
        <div>Bun venit, {this.state.data.first_name} {this.state.data.last_name}!</div>
      </div>
    )
  }
}
