import React, { PureComponent } from 'react';
import { Data } from 'react-chunky'
import Input from '../../../intro/components/input'

export default class ProfileScreen extends PureComponent {
  constructor() {
    super()
    this.state = {
      ...this.state,
      loading: true,
      profile_data: 'view',
      email_section: 'view',
      password: '',
      email: ''
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
      [section]: mode
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
                  placeholder="Firstname"
                  name="firstname"
                  description="Firstname"
                  onChangeHandler = {this.handleChange}
                  />
                  <Input
                  placeholder="Lastname"
                  name="lastname"
                  description="Lastname"
                  onChangeHandler = {this.handleChange}
                  />
              </div>
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
                onClick={e => {this.toggleEdit(e)}}
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
