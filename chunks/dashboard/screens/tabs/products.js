import React, { PureComponent } from 'react'
import PlusCircle from 'react-icons/lib/fa/plus-circle'
import ProductForm from '../../components/product-form'
import ProductsTable from '../../components/table'


export default class ProductsScreen extends PureComponent {
  constructor() {
    super()
    this.state = {
      ...this.state,
      addFormOpened: false
    }
    //   loading: true,
    // }
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
              handleSucces={this.handleSuccess}/>
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
