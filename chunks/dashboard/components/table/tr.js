import React, { Component } from 'react'
import TrashIcon from 'react-icons/lib/fa/trash'
import PencilIcon from 'react-icons/lib/fa/pencil'

export default class Tr extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      editMode: false
    }
  }

  handleCheckboxClick = (e) => {
      let lineId = this.props.data ? this.props.data.id : 'all'
      let isChecked = e.target.checked ? 'push' : 'pop'
      this.props.handleSelectionsClick(lineId, isChecked)
  }

  handleEdit = () => {
    this.setState({
      editMode: true
    })
  }

  renderCell(cell) {
    let cells = [];

    for (var key in this.props.columns) {
      let column = this.props.columns[key]
      let width = column.size
      let text = this.props.header ? column.header : this.props.data[column.key]
      let checkbox = this.props.header ? this.props.selectedAll : this.props.data.checked
      cells.push(
        <div
        style={{flexBasis: width}}
        key={key}>
          {column.header !== 'Actions' ?
            column.key === 'checkbox' ?
              <input type="checkbox"
              checked={checkbox}
              style={{width:'15px'}}
              onClick={ e => {this.handleCheckboxClick(e)}}/>
              :
              this.editMode ? 
              <input
                value={text}
              />
              :
              text
            :
            <div
            style={{textAlign:'right', padding: 0, borderRight: 0}}>
              {
                this.props.handleEditLine ?
                <PencilIcon
                  style={{
                    fontSize: '20px',
                    color:'#565650',
                    margin: '0 10px 0 0'
                  }}
                  onClick={() => this.handleEdit()}/>
                :
                null
              }
              { this.props.handleDeleteLine ?
                <TrashIcon
                style={{
                  fontSize: '18px',
                  color:'#565650',
                  margin: '-2px 5px 0 0'
                }}
                onClick={() => this.props.handleDeleteLine(this.props.data)}/>
                :
                null
              }
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
      <div
      className={this.props.header ? 'table-row header' : 'table-row'}>
        {cells}
      </div>
    )
  }
}
