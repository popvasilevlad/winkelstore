import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import LandingMenu from '../components/landing-menu'
import Jumbotron from '../components/jumbotron';
import LoginSection from '../components/landing/login-section';

export default class MainIntroScreen extends Screen {

  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
    }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  onCloudPrimary () {
    console.log('on cloud primary action....')
  }

  render() {
    return(
      <div>
        <div className="jumbotron-wrapper">
            <LandingMenu />
            <Jumbotron />
        </div>
        <a name="login-section"></a>
        <LoginSection />
      </div>
    )
  }
}
