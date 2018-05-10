import React, { PureComponent } from 'react'
import PlusCircle from 'react-icons/lib/fa/plus-circle'
// import Input from '../../../intro/components/input'
import ProductForm from '../../components/product-form'

export default class ProductsScreen extends PureComponent {
  constructor() {
    super()
    this.state = {
      ...this.state,
      addFormOpened: true
      // addFormOpened: false
    }
    //   loading: true,
    // }
  }

  addProduct = () => {
    this.setState({
      addFormOpened: !this.state.addFormOpened
    })
  }

  render() {
    // if (this.state.loading) return (<div><br/><br/>Loading</div>)

    return (
      <div>
        <div
        className="white-card"
        style={{textAlign: 'center'}}>
          <div
           className="action-item"
           onClick={this.addProduct}
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
              <ProductForm />
              :
              null
          }
        </div>
      </div>
    )
  }
}
