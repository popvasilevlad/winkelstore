import React, { Component } from 'react'
import MinusOctagon from 'react-icons/lib/fa/trash'

export default class Tr extends Component {
  constructor(props) {
    super(props)
    this.state = {...this.state}
  }

  renderCell(cell) {
    let cells = [];

    for (var key in this.props.columns) {
      let column = this.props.columns[key]
      let width = column.size
      let text = this.props.header ? column.header : this.props.data[column.key]

      cells.push(
        <div
        style={{flexBasis: width}}
        key={key}>
          {column.header !== 'Actions' ?
            text
            :
            <div
            style={{textAlign:'right', padding: 0, borderRight: 0}}>
              <MinusOctagon
              style={{
                fontSize: '18px',
                color:'#565650',
                margin: '-2px 5px 0 0'
              }}/>
            </div>
          }
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
