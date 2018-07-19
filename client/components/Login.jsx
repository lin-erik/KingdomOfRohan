import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <div className="login-container">
          <div
            className="username-container"
            onChange={this.handleUsernameChange}
          >
            <span>Username: </span>
            <input type="text" />
          </div>
          <div
            className="password-container"
            onChange={this.handlePasswordChange}
          >
            <span>Password: </span>
            <input type="text" />
          </div>
        </div>

        <div className="button-container">
          <button
            onClick={() => {
              this.setState({error: 'Incorrect username or password. Please signup or try again.' })
              this.props.login(this.state.username, this.state.password);
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;