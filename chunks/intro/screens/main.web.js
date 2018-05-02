import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import { Button, ButtonIcon } from 'rmwc/Button';

export default class MainIntroScreen extends Screen {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  components () {
    this.props.footer.sections = []
    return super.components()
  }
}
