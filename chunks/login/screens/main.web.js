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
      errorMessage: ''
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

  submitLogin = () => {
    promiseRequest('POST', REQUEST_URL.login, this.state)
      .then( res => {
        if(!res.success)
          this.setState({
            errorMessage: res.message
          })
      })
      .catch( err => { 
        this.setState({
          errorMessage: 'Error occured'
        })
      })
  }


  get renderInputs () {
    console.log('  sa', this.state)
      return (
          <div>
             <Input
              placeholder = "E-mail"
              name="email"
              onChangeHandler = {this.handleChange}
            />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              onChangeHandler = {this.handleChange}
            />
            {
              this.state.errorMessage.length ?
                <div className="error-wrapper">Incorect</div>
                : null
            }
            <Button
              unelevated
              onClick={this.submitLogin}
            >
              LOG IN
            </Button>
          </div>
      )
  }
}
