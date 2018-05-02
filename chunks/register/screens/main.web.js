import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import Input from '../../components/input'
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

  submitRegister() {
      console.log('registerrrr');
  }


  get renderInputs () {
      return (
          <div>
              <Input
                placeholder="Firstname"
                name="firstname"
              />
              <Input
                placeholder="Lastname"
              />
              <Input
                placeholder="E-mail"
              />
              <Input
                placeholder="Password"
              />
              <Input
                placeholder="Business name"
              />
              <Input
                placeholder="Address"
              />
              <Input
                placeholder="City"
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
