import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import Input from '../../intro/components/input'
import { Button, ButtonIcon } from 'rmwc/Button'
import { promiseRequest } from '../../intro/utils'
import { REQUEST_URL } from '../../intro/utils/constants'
import LandingMenu from '../../intro/components/landing-menu'
import Jumbotron from '../../intro/components/jumbotron'
import { Data } from 'react-chunky'

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
        city: '',
        errorMessage: '',
        registerSuccess: false
    }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  handleChange = (e) => {
      this.setState({
          [e.target.name] : e.target.value
      });
  }

  login = () => {
      const loginData = {
          email: this.state.email,
          password: this.state.password
      }
      promiseRequest('POST', REQUEST_URL.login, loginData)
        .then( res => {
            Data.Cache.cacheItem('userData', res.data)
            .then( () => {
              window.location = '/dashboard'
            })
            .catch(err => {
                window.location = '/'
            })
        })
        .catch( err => {
            window.location = '/'
        })
  }

  submitRegister = () => {
      promiseRequest('POST', REQUEST_URL.register_business, this.state)
      .then( () => {
          this.setState({ registerSuccess: true })
      })
      .catch( err => {
          this.setState({  errorMessage: 'Error occured. Please try again' })
      })
  }


  render() {
      return (
          <div className="register-section">
              <LandingMenu />
              <div className="register-wrapper">
              {
                  this.state.registerSuccess ?
                    <div
                    style={{
                        margin: '100px 0'
                    }}>
                        <p style={{textAlign: 'center', fontSize: '20px', opacity:'0.6'}}>
                            You have been successfully registered.
                        </p>
                        <button
                        onClick={this.login}
                        style={{margin: '20px auto 0', display: 'block'}}
                        className="register-btn highlight-btn btn"
                        >
                        LOGIN
                        </button>
                    </div>
                    :
                    <div>
                        <p style={{textAlign: 'center', fontSize: '20px', opacity:'0.6'}}>
                            Create Your Winkel Account
                        </p>
                        <div style={{display:'flex'}}>
                            <div className="register-col">
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
                                type="password"
                                onChangeHandler = {this.handleChange}
                                />
                            </div>
                            <div className="register-col">
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
                            </div>
                        </div>
                        {
                            this.state.errorMessage.length ?
                            <div
                            className="error-wrapper"
                            style={{ textAlign:'center' }}>
                            {this.state.errorMessage}
                            </div>
                            : null
                        }
                        <button
                        onClick={this.submitRegister}
                        style={{margin: '20px auto 0', display: 'block'}}
                        className="register-btn highlight-btn btn"
                        >
                        REGISTER
                        </button>
                    </div>
                }
                </div>
          </div>
      )
  }
}
