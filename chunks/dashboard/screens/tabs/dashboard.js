import React, { PureComponent } from 'react';
import { Data } from 'react-chunky'
import { promiseRequest } from '../../../intro/utils'
import { REQUEST_URL } from '../../../intro/utils/constants'
import Briefcase from 'react-icons/lib/fa/briefcase'
import ShoppingCart from 'react-icons/lib/fa/shopping-cart'

export default class DashboardScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      loading: true
    }
    this.getUserData()
  }

  getUserData = () => {
    Data.Cache.retrieveCachedItem('userData')
    .then(data => {
      this.setState({
        data,
      })
      this.getBusinessData()
    })
    .catch( (err) => {
        window.location = '/'
    });
  }

  getBusinessData() {
    promiseRequest('GET', `${REQUEST_URL.get_business_data}?business_id=${this.state.data.business_id}`)
      .then( res => {
        this.setState({
          business_data: res.data,
          loading: false
        })
      })
      .catch( err => {
        this.setState({
          errorMessage: 'Error occured'
        })
      })
  }

  render() {
    if (this.state.loading) return (
      <div
      className="white-card profile-card"
      style={{textAlign: 'center'}}
      >
        <br/><br/>Loading...<br/><br/>
      </div>
    )

    return (
      <div
      className="white-card profile-card"
      style={{textAlign: 'center'}}
      >
        Welcome, {this.state.data.first_name} {this.state.data.last_name}!
        <div>
          <Briefcase
          style={{
            fontSize: '64px',
            color:'#565650',
            margin: '30px 0 0'
          }}/>
          <div
          style={{
            fontWeight: 'bold',
            margin: '20px 0 0',
            fontSize: '32px'
          }}
          >
            {this.state.business_data.alias}
          </div>
          <div
          style={{
            fontSize: '18px'
          }}
          >
            {this.state.business_data.address}, {this.state.business_data.city}
          </div>
        </div>
        <div
        style={{textAlign: 'left'}}>
          <ShoppingCart
          style={{
            fontSize: '24px',
            color:'#565650',
            margin: '30px 0 0'
          }}/>
          <div
          style={{display: 'inline-block', verticalAlign: 'bottom', marginLeft:'10px'}}>
             - {this.state.business_data.products_count} products registered
          </div>
        </div>
      </div>
    )
  }
}
