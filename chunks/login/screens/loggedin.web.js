import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import { Data } from 'react-chunky'

export default class LoggedinScreen extends Screen {
  constructor (props) {
    super(props)
    this.state = {...this.state,
      loading: true
    }
  }

  componentDidMount () {
    super.componentDidMount()
    this.getUserData();
  }

  // components () {
  //   this.props.footer.sections = []
  //   return super.components()
  //           // .concat([this.renderInputs])
  // }

  getUserData = () => {
    Data.Cache.retrieveCachedItem('userData')
    .then(data => {
      this.setState({
        data,
        loading: false
      }) 
    })
    .catch( () => {});
  }

  render () {
    if (this.state.loading) return (<div><br/><br/>Loading</div>)

    return (
      <div> ceva
        <div>{this.state.data.first_name}</div>
      </div>
    )
  }
}
