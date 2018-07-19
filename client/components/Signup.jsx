import React from 'react'
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

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
        <h3>Create a New Account</h3>
        <div className="signup-container">
          <div className="username-container" onChange={this.handleUsernameChange}>
            <span>Username: </span><input type="text" />
          </div>
          <div className="password-container" onChange={this.handlePasswordChange}>
            <span>Password: </span><input type="text" />
          </div>
        </div>

        <div className="button-container">
          <button to="/profile" onClick={() => {
            this.props.signup(this.state.username, this.state.password)
          }}
          >Register</button> <br/>
        </div>
      </div>
    )
  }

}

export default Signup;