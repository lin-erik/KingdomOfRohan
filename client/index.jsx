import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import GlobalSearch from './components/GlobalSearch.jsx';
import Profile_Search from './components/Profile_Search.jsx';
import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: 'Anonymous',
      loginError: false,
      birthday: '',
      theme: 'Light'
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.handleTheme = this.handleTheme.bind(this);
  }

  handleSignUp(username, password, birthday) {
    console.log('username in handleSignup', username);
    console.log('birthday in handleSignup', birthday);
    axios
      .post("/signup", { username: username, password: password, birthday: birthday})
      .then(response => {
        console.log('signed up successfully!');
        this.setState({
          loggedIn: true,
          user: username,
          birthday: birthday
        });
        console.log(
          'Current logged in User: ',
          this.state.user,
          'bool',
          this.state.loggedIn
        );
      })
      .catch(err => {
        console.error('something went wrong on signup: ', err);
      });
  }

  handleLogin(username, password) {
    axios
      .post('/login', { username: username, password: password })
      .then(response => {
        if (response.data) {
          this.setState({
            loggedIn: true,
            user: username,
            birthday: response.data.birthday,
            loginError: false
          }, () => {console.log(this.state.birthday)});
        } else {
          this.setState({
            loginError: true
          });
        }
      })
      .catch(err => {
        console.log('something went wrong: ', err);
      });
  }

  handleLogout() {
    this.setState({
      loggedIn: false,
      username: 'Anonymous'
    });

    axios.get('/logout').catch(err => {
      console.error('Error logging out', err);
    });
  }

  handleTheme(e) {
    if (e.target.text === 'Dark') {
      var findlink = document.getElementsByTagName('link');
      findlink[0].href =
        'https://jenil.github.io/bulmaswatch/darkly/bulmaswatch.min.css';
    } else if (e.target.text === 'Light') {
      var findlink = document.getElementsByTagName('link');
      findlink[0].href =
        'https://jenil.github.io/bulmaswatch/flatly/bulmaswatch.min.css';
    }

    this.setState({
      theme: e.target.text
    });
  }

  isOver18() {
    let birthdayArray = this.state.birthday.split('-');
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let currentDay = date.getDate();
    
    if (currentYear - Number(birthdayArray[0]) > 18) {
      return true;
    } 
    if (currentYear - Number(birthdayArray[0]) === 18){
      if (currentMonth - Number(birthdayArray[1]) > 0) {
        return true;
      }
      if (currentMonth - Number(birthdayArray[1]) === 0 && currentDay - birthdayArray[2] >= 0) {
        return true;
      }
    }
    return false;
  }

  componentDidMount() {
    axios
      .get('/session')
      .then(response => {
        console.log(response);
        if (response.data.login) {
          this.setState({
            loggedIn: true,
            user: response.data.username,
            loginError: false
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav
            loggedIn={this.state.loggedIn}
            handleLogout={this.handleLogout}
            handleTheme={this.handleTheme}
            theme={this.state.theme}
          />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/global" />} />
            <Route
              path="/global"
              render={() => <GlobalSearch user={this.state.user} />}
            />
            <Route
              path="/profile"
              render={() =>
                this.state.loggedIn ? (
                  <Profile_Search user={this.state.user} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/login"
              render={() =>
                this.state.loggedIn ? (
                  <Redirect to="/profile" />
                ) : (
                  <Login
                    signup={this.handleSignUp}
                    login={this.handleLogin}
                    loginError={this.state.loginError}
                  />
                )
              }
            />
            <Route
              path="/signup"
              render={() =>
                this.state.loggedIn ? (
                  <Redirect to="/profile" />
                ) : (
                  <Signup signup={this.handleSignUp} login={this.handleLogin} />
                )
              }
            />
            <Route path="/logout" render={() => <Redirect to="/login" />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
