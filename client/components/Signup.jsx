import React from 'react';
import DayPicker from 'react-day-picker';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      date: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleUsernameChange(e) {
    console.log('USER CHANGE', e.target.value);
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleDateChange(e) {
    console.log('DATE CHANGE', e.target.value);
    this.setState({
      date: e.target.value
    });
  }

  render() {
    console.log(`"${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}"`)
    return (
      <div>
        <h3>Create a New Account</h3>
        <form
          to="/profile"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.signup(this.state.username, this.state.password, this.state.date);
          }}
        >
          <div className="signup-container">
            <div
              className="username-container"
              onChange={this.handleUsernameChange}
            >
              <input
                className="input is-info"
                type="text"
                placeholder="Username"
              />
            </div>
            <div
              className="password-container"
              onChange={this.handlePasswordChange}
            >
              <input
                className="input is-info"
                type="password"
                placeholder="Password"
              />
            </div>
            <br></br>
            <div className="age-container">
              <div
                className="age-container"
                onChange={this.handleDateChange}
              >
                <input
                  type="date"
                  // Max is not working. If you figure it out, well done.
                  max={`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`}
                />
              </div>
              <br></br>
            </div>
          </div>

          <div className="button-container">
            <button className="button is-link">Register</button> <br />
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
