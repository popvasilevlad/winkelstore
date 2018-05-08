import React, { PureComponent } from 'react'

export default class LandingMenu extends PureComponent {
    constructor(props) {
        super()
        this.state = props
    }

    handleRegisterClick(e) {
        window.location = '/register'
    }

    render() {
        return (
            <div className="intro-menu">
              <a href="/#login-section">
                <button
                className="btn highlight-btn"
                style={{marginRight: '20px',
                }}
                >
                  LOG IN
                </button>
              </a>
              <button
              className="btn light-btn"
              onClick ={this.handleRegisterClick}
              >
                  REGISTER
              </button>
            </div>
        )
    }
}
