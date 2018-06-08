import React, { PureComponent } from 'react';
import { Data } from 'react-chunky'
import { promiseRequest } from '../../../intro/utils'
import { REQUEST_URL } from '../../../intro/utils/constants'
import Briefcase from 'react-icons/lib/fa/briefcase'
import ShoppingCart from 'react-icons/lib/fa/shopping-cart'
import BarCode from 'react-icons/lib/fa/barcode'
import ListUl from 'react-icons/lib/fa/list-ul'

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
        <div
        style={{ fontSize: '24px'}}
        >
          Welcome, {this.state.data.first_name} {this.state.data.last_name}!
        </div>
        <div style={{
          margin: '100px 0'
        }}>
          <Briefcase
          style={{
            fontSize: '64px',
            color:'#565650',
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
        style={{
          width: '800px',
          display: 'flex',
          margin: '50px auto'}}
        >
          <div
          style={{flexBasis: '33%'}}>
            <ShoppingCart
            style={{
              fontSize: '24px',
              color:'#565650',
              display: 'block',
              margin: '30px auto 20px'
            }}/>
            <div
            style={{display: 'inline-block', verticalAlign: 'bottom', marginLeft:'10px'}}>
             {this.state.business_data.products_count || '0'} products registered
            </div>
          </div>

          <div
          style={{flexBasis: '33%'}}>
            <ListUl
            style={{
              fontSize: '24px',
              color:'#565650',
              display: 'block',
              margin: '30px auto 20px'
            }}/>
            <div
            style={{display: 'inline-block', verticalAlign: 'bottom', marginLeft:'10px'}}>
             {this.state.business_data.inventory_count || '0'} items added to inventory
            </div>
          </div>

          <div
          style={{flexBasis: '33%'}}>
            <BarCode
            style={{
              fontSize: '24px',
              color:'#565650',
              display: 'block',
              margin: '30px auto 20px'
            }}/>
            <div
            style={{display: 'inline-block', verticalAlign: 'bottom', marginLeft:'10px'}}>
             {this.state.business_data.inventory_entities_count || '0'} products added to inventory
            </div>
          </div>
        </div>
      </div>
    )
  }
}
