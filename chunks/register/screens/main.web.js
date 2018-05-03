import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import Input from '../../intro/components/input'
import { Button, ButtonIcon } from 'rmwc/Button';
import { promiseRequest } from '../../intro/utils';
import { REQUEST_URL } from '../../intro/utils/constants';

export default class MainIntroScreen extends Screen {

  constructor (props) {
    super(props)
    this.state = {
        ...this.state,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        alias: '',
        address: '',
        city: ''
    }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  components () {
    this.props.footer.sections = []
    return super.components()
            .concat([this.renderInputs])
  }

  handleChange = (e) => {
      this.setState({
          [e.target.name] : e.target.value
      });
  }

  submitRegister = () => {
      promiseRequest('POST', REQUEST_URL.register_business, this.state)
      .then( res => { console.log('res = ', res);})
      .catch( err => { console.log('err = ', err );})
  }


  get renderInputs () {
      return (
          <div>
              <Input
                placeholder = "Firstname"
                name = "firstname"
                onChangeHandler = {this.handleChange}
              />
              <Input
                placeholder="Lastname"
                name="lastname"
                onChangeHandler = {this.handleChange}
              />
              <Input
                placeholder="E-mail"
                name="email"
                onChangeHandler = {this.handleChange}
              />
              <Input
                placeholder="Password"
                name="password"
                onChangeHandler = {this.handleChange}
              />
              <Input
                placeholder="Business name"
                name="alias"
                onChangeHandler = {this.handleChange}
              />
              <Input
                placeholder="Address"
                name="address"
                onChangeHandler = {this.handleChange}
              />
              <Input
                placeholder="City"
                name="city"
                onChangeHandler = {this.handleChange}
              />
              <Button
                unelevated
                onClick={this.submitRegister}
              >
                Register
              </Button>
          </div>
      )
  }
}
