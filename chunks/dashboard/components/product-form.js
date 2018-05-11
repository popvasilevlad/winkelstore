import React, { PureComponent } from 'react'
import Input from '../../intro/components/input'
import { promiseRequest } from '../../intro/utils'
import { REQUEST_URL } from '../../intro/utils/constants'

export default class ProductForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      business_id: props.userData.business_id,
      errorMessage: ''
    }
  }

  handleChange = e => {
      this.setState({
          [e.target.name] : e.target.value
      })
  }

  submitAdd = e => {
    e.preventDefault()
    promiseRequest('POST', REQUEST_URL.add_product, this.state)
      .then( res => this.handleAddRequest(res))
      .catch( err => {
        this.setState({
          errorMessage: 'Error occured'
        })
      })
  }

  handleAddRequest(res) {
    if (!res.success) {
      this.setState({
        errorMessage: res.message
      })
    } else {
      this.props.handleSucces();
    }
  }

  render() {
    return (
      <div>
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
            onClick={this.submitAdd}
            className="highlight-btn btn"
            style={{height:'40px', width: '100%', marginTop: '25px'}}>
            ADD
            </button>
          </div>
        </div>
        {
          this.state.errorMessage.length ?
          <div
          className="error-wrapper"
          style={{padding: '15px 0 0'}}>
          {this.state.errorMessage}
          </div>
          : null
        }
      </div>
    )
  }
}
