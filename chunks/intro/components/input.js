import React, { PureComponent } from 'react'

export default class Input extends PureComponent {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <input value={this.props.value} />
      </div>
    )
  }
}
