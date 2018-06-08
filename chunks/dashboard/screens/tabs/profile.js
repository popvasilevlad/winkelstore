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
      errorMessage_profile_data: '',
      loading: true,
      profile_data: 'view',
      email_section: 'view',
      password_section: 'view',
      business_Data: 'view',
      first_name: '',
      last_name: '',
      password: '',
      email: '',
      password_actual: '',
      password_new: '',
      password_new_repeat: '',
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
      this.getBusinessData()
    })
    .catch( () => {
        window.location = '/'
    });
  }

  getBusinessData() {
    promiseRequest('GET', `${REQUEST_URL.get_business_data}?business_id=${this.state.data.business_id}`)
      .then( res => {
        let businessData = res.data;
        let profileAndBusinessData = {
          ...this.state.data,
          ...businessData
        }
        this.setState({
          data: profileAndBusinessData
        })
      })
      .catch( err => {
        this.setState({
          errorMessage: 'Error occured'
        })
      })
  }

  resetSection(section) {
    if(section === 'password_section') {
      this.setState({
        password_actual: '',
        password_new: '',
        password_new_repeat: ''
      })
    }

    if(section === 'personal_data') {
      this.setState({
        first_name: '',
        last_name: ''
      })
    }

    if(section === 'email_section') {
      this.setState({
        email: ''
      })
    }
    if(section === 'business_data') {
      this.setState({
        alias: '',
        address: '',
        city: ''
      })
    }
  }

  toggleEdit = e => {
    let section = e.target.value
    let mode = this.state[section] === 'edit' ? 'view' : 'edit'

    this.setState({
      [section]: mode,
      [`errorMessage_${section}`]: ''
    })
    this.resetSection(section)
  }

  submitChanges = e => {
    let obj = {
      ...this.state,
      section: e.target.value,
      id: this.state.data.id
    }
    let section = e.target.value;
    promiseRequest('POST', REQUEST_URL.change_user_data, obj)
      .then( res => {
        if(res && res.success === 1) {
          this.setState({
            [section]: 'view',
            [`errorMessage_${section}`]: ''
          })
          this.resetSection(section);
          Data.Cache.cacheItem('userData', res.data)
          .then( () => {
            this.getUserData()
          })
          .catch(() => {})
        }
        else {
          this.setState({
            [`errorMessage_${section}`]: res.message
          })
        }
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
      <div
      style={{
        width: '1000px',
        display: 'flex',
        margin: '0 auto'
      }}>
        <div
        style={{
          flexBasis: '50%'
        }}>
          <div className="white-card profile-card">
            <div><strong>Business data</strong></div>
            <br/>
            {
              this.state.business_data !== 'edit' ?
              <div>
              <div className="profile-line">Alias:  {this.state.data.alias}</div>
              <div className="profile-line">Address:  {this.state.data.address}</div>
              <div className="profile-line">City:  {this.state.data.city}</div>
              </div>
              :
              <div>
              <Input
              name="alias"
              description="Alias"
              onChangeHandler = {this.handleChange}
              placeholder={this.state.data.first_name}
              />
              <Input
              name="address"
              description="Address"
              onChangeHandler = {this.handleChange}
              placeholder={this.state.data.last_name}
              />
              <Input
              name="city"
              description="City"
              onChangeHandler = {this.handleChange}
              placeholder={this.state.data.last_name}
              />
              </div>
            }
            {
              this.state.errorMessage_business_data ?
              <div
              className='error-wrapper'
              style={{
                color: 'red',
                textAlign: 'center',
                margin: '10px 0 20px'
              }}
              >
              {this.state.errorMessage_business_data}
              </div>
              :
              null
            }
            {
              this.state.business_data !== 'edit' ?
              <button
              value="business_data"
              onClick={e => {this.toggleEdit(e)}}
              className="highlight-btn btn profile-edit"
              >
              EDIT
              </button>
              :
              <div>
              <button
              value="business_data"
              onClick={this.submitChanges}
              className="highlight-btn btn profile-edit"
              >
              SAVE
              </button>
              <button
              value="business_data"
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
                placeholder="New email"
                name="email"
                description="New email"
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
                onClick={this.submitChanges}
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
        </div>
        <div
        style={{
          flexBasis: '50%'
        }}>
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
              onClick={this.submitChanges}
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
            <div><strong>Password</strong></div>
            <br/>
            {
              this.state.password_section !== 'edit' ?
              <div>
              <div className="profile-line">Password: <strong>********</strong></div>
              </div>
              :
              <div>
              <Input
              placeholder="Actual password"
              name="password_actual"
              description="Actual password"
              type="password"
              onChangeHandler = {this.handleChange}
              />
              <Input
              placeholder="New password"
              name="password_new"
              description="New password"
              type="password"
              onChangeHandler = {this.handleChange}
              />
              <Input
              placeholder="Repeat new password"
              name="password_new_repeat"
              description="Repeat new password"
              type="password"
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
              onClick={this.submitChanges}
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
      </div>
    )
  }
}
