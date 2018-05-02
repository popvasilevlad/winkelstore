import React, { PureComponent } from 'react'
import { inputStyle } from '../styles/form.js'
export default class Input extends PureComponent {

  constructor(props) {
    super(props)
    this.state= {
      value: props.value,
      placeholder: props.placeholder
    }
  }

  handleChange = (value) => {
    this.setState({
      value
    })
  }

  render() {
    return (
      <div>
      {
        parseInt(this.state.value) === 10 ?
          <span> bine ba ai luat 10 fmm</span>
        :
        <div>
          <input
          value={this.state.value}
          placeholder={this.state.placeholder}
          onChange={e => this.handleChange(e.target.value)}
          style={inputStyle}
          />
        </div>
      }
      </div>
    )
  }
}
