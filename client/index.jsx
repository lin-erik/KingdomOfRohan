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
      theme: 'Light'
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.handleTheme = this.handleTheme.bind(this);
  }

  handleSignUp(username, password) {
    axios
      .post('/signup', { username: username, password: password })
      .then(response => {
        console.log('signed up successfully!');
        this.setState({
          loggedIn: true,
          user: username
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
            loginError: false
          });
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
    this.setState({ loggedIn: false });

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
