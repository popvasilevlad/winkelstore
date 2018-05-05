import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import Input from '../../intro/components/input'
import { Button, ButtonIcon } from 'rmwc/Button';
import { promiseRequest } from '../../intro/utils';
import { REQUEST_URL } from '../../intro/utils/constants';
import { Data } from 'react-chunky'

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

  onCloudPrimary () {
    console.log('on cloud primary action....')
  }

  handleChange = (e) => {
      this.setState({
          [e.target.name] : e.target.value
      });
  }

  goToRegister()  {
    window.location = '/register'
  }

  submitLogin = () => {
    promiseRequest('POST', REQUEST_URL.login, this.state)
      .then( res => this.handleLoginSuccess(res))
      .catch( err => { 
        this.setState({
          errorMessage: 'Error occured'
        })
      })
  }

  handleLoginSuccess = (res) => {
    if(!res.success) {
      this.setState({
        errorMessage: res.message
      })
    } else {
      Data.Cache.cacheItem('userData', res.data)
      .then( () => { 
        window.location = '/dashboard'
      })
      .catch((err) => {})
    }
  }

  render() {
  const imageUrl = require(`../../../images/spotlight.jpg`)
    return(
      <div>
        <div 
          style={{ backgroundImage: `url(${imageUrl})` }}
          className="jumbotron-wrapper"
        >
          <div className="intro-menu">
            <Button
              unelevated
              onClick={this.goToRegister}
              style={{marginRight: '20px'}}
            >
              REGISTER
            </Button>
            <a href="#login-section">
              <Button
                unelevated
              >
                LOG IN
              </Button>
            </a>
          </div>
          <div className="jumbotron-content">
            <h1>Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text</h1>
            <h2>Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text</h2>
          </div>
        </div>
        <a name="login-section"></a>
        <div className="auth-section">
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
      </div>
    )
  }
}
