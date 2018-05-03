import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import Input from '../../intro/components/input'
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
            .concat([this.renderInputs])
  }


  get renderInputs () {
      return (
          <div>
              <Input
                placeholder="E-mail"
              />
              <Input
                placeholder="Password"
              />
              <Button unelevated>Login</Button>
              <div> <br/> </div>
          </div>
      )
  }
}
