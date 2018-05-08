import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import { Data } from 'react-chunky'

export default class DashboardScreen extends Screen {
  constructor (props) {
    console.log('props', props)
    super(props)
    this.state = {...this.state,
      loading: true
    }
  }

  componentDidMount () {
    super.componentDidMount()
    this.getUserData();
  }

  signOut() {
      Data.Cache.clearCachedItem('userData')
      .then(() => {
          window.location = '/'
      })
      .catch( err => {
          console.log(err);
      })
  }

  getUserData = () => {
    Data.Cache.retrieveCachedItem('userData')
    .then(data => {
      this.setState({
        data,
        loading: false
      })
    })
    .catch( () => {
        window.location = '/'
    });
  }

  render () {
    if (this.state.loading) return (<div><br/><br/>Loading</div>)

    return (
      <div> ceva
        <div>{this.state.data.first_name}</div>
        <button
        className="btn highlight-btn"
        onClick={this.signOut}>
            SIGN OUT
        </button>
      </div>
    )
  }
}
