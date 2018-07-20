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
        {
          this.props.loginError ?
          <span>Incorrect Username or Password.  Please try again</span>
          : null
        }
        <form onSubmit = {(e) => {
              e.preventDefault();
              this.setState({error: 'Incorrect username or password. Please signup or try again.' })
              this.props.login(this.state.username, this.state.password);
            }}>
        <div className="login-container">
          <div
            className="username-container"
            onChange={this.handleUsernameChange}
          >
            <input className='input is-info is-rounded is-hovered' type="text" placeholder="Username"/>
          </div>
          <div
            className="password-container"
            onChange={this.handlePasswordChange}
          >
            <input className='input is-info is-rounded is-hovered' type="password" placeholder="Password" />
          </div>
        </div>

        <div className="button-container">
          <button className="button is-success is-link is-focused is-active is-rounded is-hovered"
            onClick={() => {
              this.setState({error: 'Incorrect username or password. Please signup or try again.' })
              this.props.login(this.state.username, this.state.password);
            }}
          >
            Login
          </button>
        </div>
        </form>
      </div>
    );
  }
}

export default Login;