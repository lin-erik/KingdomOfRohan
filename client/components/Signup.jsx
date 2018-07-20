import React from 'react';

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
        <form to="/profile"  onSubmit={(e) => {
            e.preventDefault();
            this.props.signup(this.state.username, this.state.password)
          }}>
        <div className="signup-container">
          <div className="username-container" onChange={this.handleUsernameChange}>
            <input class='input is-info is-rounded is-hovered' type="text" placeholder="Username"/>
          </div>
          <div className="password-container" onChange={this.handlePasswordChange}>
            <input class='input is-info is-rounded is-hovered' type="password" placeholder="Password" />
          </div>
        </div>

        <div className="button-container">
          <button class='button is-link is-focused is-active is-rounded is-hovered'
          >Register</button> <br/>
        </div>
        </form>
      </div>
    )
  }

}

export default Signup;