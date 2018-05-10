import React, { PureComponent } from 'react'
import Input from '../input'
import { promiseRequest } from '../../utils'
import { REQUEST_URL } from '../../utils/constants'
import { Data } from 'react-chunky'

export default class LoginSection extends PureComponent {
    constructor() {
        super()
        this.state = {
            ...this.state,
            errorMessage: ''
        }
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn() {
        Data.Cache.retrieveCachedItem('userData')
        .then(() => {
          window.location ='/dashboard'
        })
        .catch( () => {})
    }

    goToRegister() {
        window.location = '/register'
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

    submitLogin = e => {
        e.preventDefault();
      promiseRequest('POST', REQUEST_URL.login, this.state)
        .then( res => this.handleLoginSuccess(res))
        .catch( err => {
          this.setState({
            errorMessage: 'Error occured'
          })
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        const imgSRC = require(`../../../../images/graph-icon.png`)
        return(
            <div className="login-section">
                <div className="login-section-wrapper">
                    <div
                    className="register-advice"
                    >
                        <img
                        src={imgSRC}
                        className="register-img"
                        />
                        <p>Get rid of the stress of inventory sessions and let us rock the math for you.
                        We'll show you all your stock's ups and downs and other helpful statistics.
                        <br/>Start your journey now!
                        </p>
                        <button
                        className="btn light-btn register-btn"
                        onClick={this.goToRegister}
                        >REGISTER NOW</button>
                    </div>
                    <div className="login-form">
                        <p style={{textAlign:'center'}}>Already taking part of our team? Log in here.</p>
                        <form>
                            <Input
                            placeholder = "E-mail"
                            name="email"
                            description="E-mail"
                            onChangeHandler = {this.handleChange}
                            />
                            <Input
                            placeholder="Password"
                            name="password"
                            type="password"
                            description="Password"
                            onChangeHandler = {this.handleChange}
                            />
                            {
                                this.state.errorMessage.length ?
                                    <div className="error-wrapper">Invalid username or password</div>
                                : null
                            }

                            <button
                            className="highlight-btn btn"
                            onClick={this.submitLogin}
                            style={{
                                display:'flex',
                                margin:'20px auto 0',
                                height:'40px'
                            }}
                            >LOG IN</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
