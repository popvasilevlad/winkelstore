import React, { PureComponent } from 'react'
import Input from '../../intro/components/input'

export default class ProductForm extends PureComponent {
  constructor() {
    super()
    this.state = {...this.state}
  }

  render() {
    return (
      <div className="add-product-form">
        <Input
        placeholder="Name"
        name="name"
        description="Name"
        onChangeHandler = {this.handleChange}
        holderStyle={{flexBasis:'15%'}}
        />
        <Input
        placeholder = "Price"
        name="price"
        description="Price"
        onChangeHandler = {this.handleChange}
        />
        <Input
        placeholder = "Code"
        name="code"
        description="Code"
        onChangeHandler = {this.handleChange}
        />
        <Input
        placeholder = "Description"
        name="description"
        description="Description"
        onChangeHandler = {this.handleChange}
        holderStyle={{flexBasis:'30%'}}
        />
        <div className="input-holder" style={{flexBasis:'10%'}}>
          <button
          className="highlight-btn btn"
          style={{height:'40px', width: '100%', marginTop: '25px'}}>
          ADD
          </button>
        </div>
      </div>
    )
  }
}
