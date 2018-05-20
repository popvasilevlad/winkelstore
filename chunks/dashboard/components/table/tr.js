import React, { Component } from 'react'
import TrashIcon from 'react-icons/lib/fa/trash'
import PencilIcon from 'react-icons/lib/fa/pencil'
import CheckIcon from 'react-icons/lib/fa/check'
import CloseIcon from 'react-icons/lib/fa/ban'

export default class Tr extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      editMode: false,
      data: props.data
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

  submitEdit = () => {
    this.props.handleEditLine(this.state.data)
    this.setState({
      editMode: false
    })
  }

  cancelEdit = () => {
    this.setState({
      editMode: false
    })
  }

  handleInputChange = e => {
    this.setState({
        [e.target.name] : e.target.value
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
              this.state.editMode ? 
              <input
                value={text}
                name={this.props.columns[key].key}
                style={{
                  height: '30px',
                  padding: '0 10px',
                  borderRadius: '3px'
                }}
                onChange={ e => {this.handleInputChange}}
              />
              :
              text
            :
            <div
            style={{textAlign:'right', padding: 0, borderRight: 0}}>
              {
                this.state.editMode ?
                <div
                style={{
                  display:'inline-block',
                  padding: '0'}}>
                  <CheckIcon
                    style={{
                      fontSize: '20px',
                      color:'rgba(15, 161, 14, 1)',
                      margin: '0 10px 0 0'
                    }}
                    onClick={() => this.submitEdit()}/>
                    <CloseIcon
                      style={{
                        fontSize: '20px',
                        color:'rgba(243, 9, 8, 1)',
                        margin: '0 10px 0 0'
                      }}
                      onClick={() => this.cancelEdit()}/>
                  </div>
                :
                null
              }
              {
                this.props.handleEditLine && !this.state.editMode ?
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
