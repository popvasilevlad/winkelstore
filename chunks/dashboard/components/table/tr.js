import React, { PureComponent } from 'react'

export default class Tr extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {...this.state}
  }

  render() {
    return (
      <div className={this.props.header ? 'table-row header' : 'table-row'}>
        <div style={{flexBasis: this.props.dimensions[0]}}>Code</div>
        <div style={{flexBasis: this.props.dimensions[1]}}>Name</div>
        <div style={{flexBasis: this.props.dimensions[2]}}>Price</div>
        <div style={{flexBasis: this.props.dimensions[3]}}>Description</div>
        <div style={{flexBasis: this.props.dimensions[4]}}>Action</div>
      </div>
    )
  }
}
