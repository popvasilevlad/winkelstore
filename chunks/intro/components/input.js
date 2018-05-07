import React, { PureComponent } from 'react'
import { inputStyle } from '../styles/form.js'

export default class Input extends PureComponent {
  constructor(props) {
    super(props)
    this.state = props
  }

  handleChange(e) {
      const view = this.state.view

      this.state.onChange(this.state.view, e);
  }

  render() {
    return (
        <div className="input-holder">
          <div>{this.props.description}</div>
          <input
              value={this.state.value}
              placeholder={this.state.placeholder}
              name={this.state.name}
              style={inputStyle}
              type={this.props.type || 'text'}
              onChange={(event) => this.props.onChangeHandler(event, this.state.name)}
          />
          <div className="input-error"></div>
        </div>
    )
  }
}
