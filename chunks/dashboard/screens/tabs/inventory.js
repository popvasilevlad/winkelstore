import React, { Component } from 'react';
import InventoryAddForm from '../../components/inventory-add-form'
import { Data } from 'react-chunky'
import PlusCircle from 'react-icons/lib/fa/plus-circle'
import { REQUEST_URL } from '../../../intro/utils/constants'
import { promiseRequest } from '../../../intro/utils'
import InventoryTable from '../../components/table'
import $ from 'jquery'
import ReactFileReader from 'react-file-reader';
import XLSX from 'xlsx';
// import xls_json from "xls-to-json";

export default class InventoryScreen extends Component {
  constructor() {
    super()
    this.state = {
      ...this.state,
      addFormOpened: false,
      loadingMessage: true,
      products: [],
      selectedAll: false,
      selections: []
    }
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
        loadingMessage: '',
        selectedAll: false
      })
    } else {
      this.setState({
        products: [],
        loadingMessage: res.message,
        selectedAll: false
      })
    }
  }

  handleFiles = (files) => {
    let attachement = files.base64.split(',')[1];
    let convertedFile = XLSX.read(attachement.replace(/_/g, "/").replace(/-/g, "+"), {type:'base64'})
    let convertedArray = XLSX.utils.sheet_to_json(convertedFile.Sheets.Sheet1)
    console.log('conb', convertedArray)
  }

  handleDelete = data => {
    const param = data && data.name ? [data.id] : data
    promiseRequest('POST', REQUEST_URL.delete_inventory_product, param)
      .then( res => {
        res.success ? this.getProducts() : console.log('Error. Check response')
      })
      .catch( err => console.log('err = ', err))
  }

  deleteSelections = () => {
    if(this.state.selections.length || this.state.selectedAll) {
      let itemsToDelete = !this.state.selectedAll ? this.state.selections : null
      this.handleDelete(itemsToDelete)
    }
  }

  handleSelectionsClick = (id, action) => {
    if (id === 'all') {
      let products = [];
      for(var key in this.state.products) {
        let obj = this.state.products[key]
        obj.checked = action === 'push'
        products.push(obj)
      }
      this.setState({
        products: products,
        selectedAll: action === 'push'
      })
    } else {
      let products = this.state.products

      products.find(product => product.id === id).checked = action === 'push'
      let selectedProducts = products.filter(item => item.checked === true)
      let selections = selectedProducts.map(product => { return product.id })

      this.setState({
        products,
        selectedAll: selectedProducts.length === products.length,
        selections: selections
      })
    }
  }

  render() {
    const columns = [
      {
        header: '',
        size: '1%',
        key: 'checkbox'
      },
      {
        header: 'Barcode',
        size: '14%',
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
          <div>
            <div
            style={{textAlign:'right'}}>
              <button
              className="highlight-btn btn"
              onClick={this.deleteSelections}
              style={{height:'40px', margin: '0 0 10px 0'}}>
                DELETE SELECTIONS
              </button>
              <ReactFileReader fileTypes={[".xlsx"]} base64={true} multipleFiles={false} handleFiles={this.handleFiles}>
                <button className='btn'>Upload</button>
              </ReactFileReader>
            </div>
            <InventoryTable
            columns={columns}
            data={this.state.products}
            handleDelete={this.handleDelete}
            handleSelectionsClick={this.handleSelectionsClick}
            selectedAll={this.state.selectedAll} />
          </div>
        }
        </div>
      </div>
    )
  }
}
