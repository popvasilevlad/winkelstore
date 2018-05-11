import React, { PureComponent } from 'react'
import Tr from './tr'

export default class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {...this.state}
  }

  createTable() {
    let rows = []

    for (var key in this.props.data) {
      rows.push(
        <Tr data={this.props.data[key]}
        columns={this.props.columns}
        key={key}
        />
      )
    }

    return rows
  }

  render() {
    const rows = this.createTable()
    return (
      <div className="products-table">
        <Tr header={true} columns={this.props.columns} />
        {rows}
      </div>
    )
  }
}
