import React, { PureComponent } from 'react'

export default class MenuItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state
    }
  }


  render() {
    return (
      <div>
      {
        this.props.activeTab === this.props.text ?
        <div
        className='menu-item active'
        onClick={() => { this.props.handleClick(this.props.text)}}
        >
        {this.props.text}
        </div>
        :
        <div
        className='menu-item'
        onClick={() => { this.props.handleClick(this.props.text)}}
        >
        {this.props.text}
        </div>
      }
      </div>
    )
  }
}
