import React, { PureComponent } from 'react'
import Tr from './tr'

export default class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {...this.state}
    console.log(this.props.dimensions);
  }

  render() {
    return (
      <div className="products-table">
        <Tr
          header={true}
          headers={this.props.headers}
          dimensions={this.props.dimensions}
        />
        <Tr dimensions={this.props.dimensions}/>
        <Tr dimensions={this.props.dimensions}/>
        <Tr dimensions={this.props.dimensions}/>
      </div>
    )
  }
}
