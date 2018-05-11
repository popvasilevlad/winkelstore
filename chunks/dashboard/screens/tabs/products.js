import React, { PureComponent } from 'react'
import PlusCircle from 'react-icons/lib/fa/plus-circle'
import ProductForm from '../../components/product-form'
import ProductsTable from '../../components/table'
import { REQUEST_URL } from '../../../intro/utils/constants'
import { Data } from 'react-chunky'

export default class ProductsScreen extends PureComponent {
  constructor() {
    super()
    this.state = {
      ...this.state,
      addFormOpened: false
    }
    //   loading: true,
    // }
    this.getUserData();
  }

  getUserData = () => {
    Data.Cache.retrieveCachedItem('userData')
    .then(data => {
      this.setState({
        data: data
      })
    })
    .catch( () => {
        window.location = '/'
    });
  }


  toggleProductForm = () => {
    this.setState({
      addFormOpened: !this.state.addFormOpened
    })
  }

  handleSuccess = () => {
    console.log('handleSuccess');
    this.toggleProductForm();
  }

  getProducts() {
    promiseRequest('GET', REQUEST_URL.getProducts, this.state)
      .then( res => this.handleGetRequest(res))
      .catch( err => {
        this.setState({
          errorMessage: 'Error occured'
        })
      })
  }

  handleGetRequest() {
    console.log('handle get');
  }

  render() {
    const headers = ['Code', 'Name', 'Price', 'Description', '']
    const sizes = ['10%', '20%', '10%', '50%', '10%']

    return (
      <div>
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
              <ProductForm
              handleSucces={this.handleSuccess}
              userData={this.state.data}/>
              :
              null
          }
        </div>
        <div className="white-card">
          <ProductsTable
          headers={this.headers}
          // rows={rows}
          dimensions={sizes} />
        </div>
      </div>
    )
  }
}
