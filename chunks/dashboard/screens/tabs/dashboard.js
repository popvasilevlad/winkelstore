import React, { PureComponent } from 'react';
import { Data } from 'react-chunky'

export default class DashboardScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      loading: true
    }
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

  render() {
    if (this.state.loading) return (<div><br/><br/>Loading</div>)

    return (<div>Welcome, {this.state.data.first_name} {this.state.data.last_name}!</div>)
  }
}
