import React, { PureComponent } from 'react';
import InventoryAddForm from '../../components/inventory-add-form'
import { Data } from 'react-chunky'
import PlusCircle from 'react-icons/lib/fa/plus-circle'
import { REQUEST_URL } from '../../../intro/utils/constants'
import { promiseRequest } from '../../../intro/utils'
import InventoryTable from '../../components/table'

export default class InventoryScreen extends PureComponent {
  constructor() {
    super()
    this.state = {
      ...this.state,
      addFormOpened: false,
      loadingMessage: true,
      selections: []
    }
    // }
    this.getUserData()
  }

  toggleInventoryForm = () => {
    this.setState({
      addFormOpened: !this.state.addFormOpened
    })
  }

  handleSuccess = () => {
    this.toggleInventoryForm()
    this.getProducts()
  }

  getUserData = () => {
    return Data.Cache.retrieveCachedItem('userData')
    .then(data => {
      this.setState({
        data: data
      })
      this.getProducts()
    })
    .catch( (err) => {
        console.log('err = ', err);
    });
  }

  getProducts() {
    promiseRequest('GET', `${REQUEST_URL.get_inventory}?business_id=${this.state.data.business_id}` )
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
    promiseRequest('POST', REQUEST_URL.delete_inventory_product, lineData)
      .then( res => {
        res.success ? this.getProducts() : console.log('Error')
      })
      .catch( err => console.log('err = ', err))
  }

  handleSelectionsClick = (id, action) => {
    let selections = this.state.selections
    selections[action](id)

    this.setState({
        selectedAll: selections
    })

    console.log(this.state.selections);
  }

  render() {

    const columns = [
      {
        header: '',
        size: '2',
        key: 'checkbox'
      },
      {
        header: 'Barcode',
        size: '13%',
        key: 'code'
      },
      { header: 'Name',
        size: '25%',
        key: 'name'
      },
      {
        header: 'Observations',
        size: '40%',
        key: 'observations'
      },
      {
        header: 'Quantity',
        size: '10%',
        key: 'quantity'
      },
      {
        header: 'Actions',
        size: '10%',
      }
    ]
    return (
      <div>
        <div
        className="white-card"
        style={{textAlign: 'center'}}>
          <div
             className="action-item"
             onClick={this.toggleInventoryForm}
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
          <InventoryTable
          columns={columns}
          data={this.state.products}
          handleDelete={this.handleDelete}
          handleSelectionsClick={this.handleSelectionsClick} />
        }
        </div>
      </div>
    )
  }
}
