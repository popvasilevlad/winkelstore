import React from 'react'
import { Screen, Components } from 'react-dom-chunky'

import Input from '../components/input'

export default class MainIntroScreen extends Screen {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  // components () {
  //   this.props.footer.sections = []
  //   return super.components()
  // }

  render () {
    console.log('here');
    return (
      <Input
        value={5}
      />
    )
  }
}
