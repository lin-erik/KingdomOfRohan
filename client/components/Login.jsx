import React from 'react'

class Login_Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
    this.handleSignupToggle = this.handleSignupToggle.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  };



  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <div className="login-container">
          <div className="username-container" onChange={this.handleUsernameChange} >
            <span>Username: </span><input type="text" />
          </div>
          <div className="password-container" onChange={this.handlePasswordChange}>
            <span>Password: </span><input type="text" />
          </div>
        </div>


        <div className="button-container">
          <button onClick={() => {
            let un = this.state.username;
            let pw = this.state.password;
            this.props.login(un, pw)
          }}
          >Login</button>
          <button onClick={this.handleSignupToggle} >Sign Up Page</button>
        </div>
      </div>
    )
  }












  render() {
    if (this.state.showLoginPage) {
      return (
        <div>
          <h3>Login</h3>
          <div className="login-container">
            <div className="username-container" onChange={this.handleUsernameChange} >
              <span>Username: </span><input type="text" />
            </div>
            <div className="password-container" onChange={this.handlePasswordChange}>
              <span>Password: </span><input type="text" />
            </div>
          </div>


          <div className="button-container">
            <button onClick={() => {
              let un = this.state.username;
              let pw = this.state.password;
              this.props.login(un, pw)
            }}
            >Login</button>
            <button onClick={this.handleSignupToggle} >Sign Up Page</button>
          </div>
        </div>
      )