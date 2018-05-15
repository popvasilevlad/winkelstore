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
        handleDeleteLine={this.props.handleDelete}
        handleSelectionsClick={this.props.handleSelectionsClick}
        />
      )
    }

    return rows
  }

  render() {
    const rows = this.createTable()
    return (
      <div className="products-table">
        <Tr header={true}
        columns={this.props.columns}
        handleSelectionsClick={this.props.handleSelectionsClick} />
        {rows}
      </div>
    )
  }
}
