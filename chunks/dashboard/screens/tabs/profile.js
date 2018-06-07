import React, { Component } from 'react';
import { Data } from 'react-chunky'
import Input from '../../../intro/components/input'
import { promiseRequest } from '../../../intro/utils'
import { REQUEST_URL } from '../../../intro/utils/constants'

export default class ProfileScreen extends Component {
  constructor() {
    super()
    this.state = {
      ...this.state,
      loading: true,
      profile_data: 'view',
      errorMessagE_profile_data: '',
      email_section: 'view',
      password: '',
      email: '',
      data: ''
    }
    this.getUserData()
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

  toggleEdit = e => {
    let section = e.target.value
    let mode = this.state[section] === 'edit' ? 'view' : 'edit'

    this.setState({
      [section]: mode,
      [`errorMessage_${section}`]: ''
    })
  }

  submitPersonalData = e => {
    let obj = {
      ...this.state,
      section: e.target.value,
      id: this.state.data.id
    }
    let section = e.target.value;
    promiseRequest('POST', REQUEST_URL.change_user_data, obj)
      .then( res => {
        this.setState({
          [section]: 'view',
          [`errorMessage_${section}`]: ''
        })
        Data.Cache.cacheItem('userData', res.data)
        .then( () => {
          this.getUserData()
        })
        .catch((err) => {})
      })
      .catch( err => {
        this.setState({
          [`errorMessage_${section}`]: 'Error occured'
        })
      })
  }

  handleChange = e => {
      this.setState({
          [e.target.name] : e.target.value
      })
  }

  render() {
    if (this.state.loading) return (<div><br/><br/>Loading</div>)

    return (
      <div>
          <div className="white-card profile-card">
            <div><strong>Profile data</strong></div>
            <br/>
            {
              this.state.profile_data !== 'edit' ?
              <div>
                <div className="profile-line">Firstname:  {this.state.data.first_name}</div>
                <div className="profile-line">Lastname:  {this.state.data.last_name}</div>
              </div>
              :
              <div>
                  <Input
                  name="first_name"
                  description="Firstname"
                  onChangeHandler = {this.handleChange}
                  placeholder={this.state.data.first_name}
                  />
                  <Input
                  name="last_name"
                  description="Lastname"
                  onChangeHandler = {this.handleChange}
                  placeholder={this.state.data.last_name}
                  />
              </div>
            }
            {
              this.state.errorMessage_profile_data ?
              <div
              className='error-wrapper'
              style={{
                color: 'red',
                textAlign: 'center',
                margin: '10px 0 20px'
              }}
              >
                {this.state.errorMessage_profile_data}
              </div>
              :
              null
            }
            {
              this.state.profile_data !== 'edit' ?
              <button
              value="profile_data"
              onClick={e => {this.toggleEdit(e)}}
              className="highlight-btn btn profile-edit"
              >
              EDIT
              </button>
              :
              <div>
                <button
                value="profile_data"
                onClick={this.submitPersonalData}
                className="highlight-btn btn profile-edit"
                >
                SAVE
                </button>
                <button
                value="profile_data"
                onClick={e => {this.toggleEdit(e)}}
                className="outlined-btn btn profile-edit"
                >
                CANCEL
                </button>
              </div>
            }

          </div>
          <div className="white-card profile-card">
            <div><strong>E-mail</strong></div>
            <br/>
            {
              this.state.email_section !== 'edit' ?
              <div>
                <div className="profile-line">E-mail:  {this.state.data.email}</div>
              </div>
              :
              <div>
                  <Input
                  placeholder="Current e-mail"
                  name="email"
                  description="Current e-mail"
                  onChangeHandler = {this.handleChange}
                  />
                  <Input
                  placeholder="New email"
                  name="New-email"
                  description="New email"
                  onChangeHandler = {this.handleChange}
                  />
                  <Input
                  placeholder="Repeat new email"
                  name="repeat-new-email"
                  description="Repeat new email"
                  onChangeHandler = {this.handleChange}
                  />
              </div>
            }
            {
              this.state.errorMessage_email_section ?
              <div
              className='error-wrapper'
              style={{
                color: 'red',
                textAlign: 'center',
                margin: '10px 0 20px'
              }}
              >
                {this.state.errorMessage_email_section}
              </div>
              :
              null
            }
            {
              this.state.email_section !== 'edit' ?
              <button
              value="email_section"
              onClick={e => {this.toggleEdit(e)}}
              className="highlight-btn btn profile-edit"
              >
              EDIT
              </button>
              :
              <div>
                <button
                value="email_section"
                onClick={e => {this.toggleEdit(e)}}
                className="highlight-btn btn profile-edit"
                >
                SAVE
                </button>
                <button
                value="email_section"
                onClick={e => {this.toggleEdit(e)}}
                className="outlined-btn btn profile-edit"
                >
                CANCEL
                </button>
              </div>
            }
          </div>
          <div className="white-card profile-card">
            <div><strong>Password</strong></div>
            <br/>
            {
              this.state.password_section !== 'edit' ?
              <div>
                <div className="profile-line">Passwrod: <strong>********</strong></div>
              </div>
              :
              <div>
                  <Input
                  placeholder="Actual password"
                  name="actual-password"
                  description="Actual password"
                  onChangeHandler = {this.handleChange}
                  />
                  <Input
                  placeholder="New password"
                  name="New-password"
                  description="New password"
                  onChangeHandler = {this.handleChange}
                  />
                  <Input
                  placeholder="Repeat new password"
                  name="repeat-new-password"
                  description="Repeat new password"
                  onChangeHandler = {this.handleChange}
                  />
              </div>
            }
            {
              this.state.errorMessage_password_section ?
              <div
              className='error-wrapper'
              style={{
                color: 'red',
                textAlign: 'center',
                margin: '10px 0 20px'
              }}
              >
                {this.state.errorMessage_password_section}
              </div>
              :
              null
            }
            {
              this.state.password_section !== 'edit' ?
              <button
              value="password_section"
              onClick={e => {this.toggleEdit(e)}}
              className="highlight-btn btn profile-edit"
              >
              EDIT
              </button>
              :
              <div>
                <button
                value="password_section"
                onClick={e => {this.toggleEdit(e)}}
                className="highlight-btn btn profile-edit"
                >
                SAVE
                </button>
                <button
                value="password_section"
                onClick={e => {this.toggleEdit(e)}}
                className="outlined-btn btn profile-edit"
                >
                CANCEL
                </button>
              </div>
            }
          </div>
      </div>
    )
  }
}
