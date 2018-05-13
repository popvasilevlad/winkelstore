import React, { PureComponent } from 'react'
import PlusCircle from 'react-icons/lib/fa/plus-circle'
import ProductForm from '../../components/product-form'
import ProductsTable from '../../components/table'
import { REQUEST_URL } from '../../../intro/utils/constants'
import { Data } from 'react-chunky'
import { promiseRequest } from '../../../intro/utils'

export default class ProductsScreen extends PureComponent {
  constructor() {
    super()
    this.state = {
      ...this.state,
      addFormOpened: false,
      loadingMessage: 'Products are loading...'
    }
    this.getUserData()
  }


  getUserData = () => {
    Data.Cache.retrieveCachedItem('userData')
    .then(data => {
      this.setState({
        data: data
      })
      this.getProducts()
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

  handleSuccess = (product) => {
    this.toggleProductForm()
    this.getProducts()
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

  handleGetRequest(res) {
    if (res.success) {
      this.setState({
        products: res.products,
        loadingMessage: ''
      })
    } else {
      this.setState({
        products: [],
        loadingMessage: res.message
      })
    }
  }

  handleDelete = lineData => {
    promiseRequest('POST', REQUEST_URL.delete_product, lineData)
      .then( res => {
        res.success ? this.getProducts() : console.log('Error')
      })
      .catch( err => console.log('err = ', err))
  }

  render() {
    const columns = [
      { header: 'Code',
        size: '10%',
        key: 'code'
      },
      { header: 'Name',
        size: '25%',
        key: 'name'
      },
      { header: 'Price',
        size: '10%',
        key: 'price'
      },
      { header: 'Description',
        size: '45%',
        key: 'description'
      },
      { header: 'Actions',
        size: '10%'
      }
    ]

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
        {
          this.state.loadingMessage.length ?
          <div
          style={{
            margin: '250px auto',
            textAlign: 'center',
            fontSize: '18px'
          }}>{this.state.loadingMessage}</div>
          :
          <ProductsTable
          columns={columns}
          data={this.state.products}
          handleDelete={this.handleDelete} />
        }
        </div>
      </div>
    )
  }
}
