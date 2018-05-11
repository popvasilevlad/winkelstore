import React, { Component } from 'react'

export default class Tr extends Component {
  constructor(props) {
    super(props)
    this.state = {...this.state}
  }

  renderCell(cell) {
    let cells = [];

    for (var key in this.props.columns) {
      let width = this.props.columns[key].size
      let text = this.props.header ? this.props.columns[key].header : this.props.data[this.props.columns[key].key]
      cells.push(
        <div
        style={{flexBasis: width}}
        key={key}>
          {text}
        </div>
      )
    }

    return cells;
  }

  render() {
    let cells = this.renderCell()
    return (
      <div className={this.props.header ? 'table-row header' : 'table-row'}>
        {cells}
      </div>
    )
  }
}
