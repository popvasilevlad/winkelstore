import React, { PureComponent } from 'react';
import InventoryAddForm from '../../components/inventory-add-form'
import { Data } from 'react-chunky'
import PlusCircle from 'react-icons/lib/fa/plus-circle'

export default class InventoryScreen extends PureComponent {
  constructor() {
    super()
    this.state = {
      ...this.state,
      addFormOpened: false,
      loading: true
    }
    // }
    this.getUserData()
  }

  toggleProductForm = () => {
    this.setState({
      addFormOpened: !this.state.addFormOpened
    })
  }

  getUserData = () => {
    return Data.Cache.retrieveCachedItem('userData')
    .then(data => {
      this.setState({
        data: data
      })
      // this.getProducts()
    })
    .catch( (err) => {
        window.location = '/'
    });
  }

  getProducts() {
    promiseRequest('GET', REQUEST_URL.get_products + '?business_id=' + this.state.data.business_id )
      .then( res => this.handleGetRequest(res))
      .catch( err => {
        this.setState({
          loadingMessage: 'Error occured'
        })
      })
  }

  render() {
    return (
      <div 
      className="white-card"
      style={{textAlign: 'center'}}>
        <div
           className="action-item"
           onClick={this.toggleProductForm}
           >
            <PlusCircle
            style={{
              fontSize: '24px',
              color:'#565650',
              margin: '-2px 5px 0 0'
            }}/>
            Add Product
          </div>
          {
            this.state.addFormOpened ?
              <InventoryAddForm
              handleSucces={this.handleSuccess}
              userData={this.state.data}/>
            :
            null
          }
      </div>
    )
  }
}
