import React from 'react';
import ReactDOM from 'react-dom';
import GlobalSearch from './components/GlobalSearch.jsx';
import Profile_Search from './components/Profile_Search.jsx';
import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Purchased from './components/Purchased.jsx';

import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Modal from 'react-responsive-modal';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: 'Anonymous',
      loginError: false,
      age: '',
      underage: false,
      theme: 'Light',
      purchased: []
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.handleTheme = this.handleTheme.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handlePurchase = this.handlePurchase.bind(this);
  }

  handleSignUp(username, password, birthday) {
    axios
      .post('/signup', {
        username: username,
        password: password,
        birthday: birthday
      })
      .then(response => {
        this.setState({
          loggedIn: true,
          user: username,
          overage: response.data
        });
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
            overage: response.data.overage,
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
    var findlink = document.getElementsByTagName('link');
    findlink[0].href =
      'https://jenil.github.io/bulmaswatch/flatly/bulmaswatch.min.css';

    axios.get('/logout').catch(err => {
      console.error('Error logging out', err);
    });

    this.setState({
      loggedIn: false,
      username: 'Anonymous'
    });
  }

  handleTheme(e) {
    if (this.state.overage) {
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
    } else {
      this.setState({
        underage: true
      });
    }
  }

  handleClose() {
    this.setState({
      underage: false
    });
  }

  handlePurchase(purchased) {
    this.setState({
      purchased
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
            overage: response.data.overage,
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
              render={() => (
                <GlobalSearch
                  user={this.state.user}
                  loggedIn={this.state.loggedIn}
                  purchase={this.state.purchased}
                  handlePurchase={this.handlePurchase}
                />
              )}
            />
            <Route
              path="/profile"
              render={() =>
                this.state.loggedIn ? (
                  <Profile_Search
                    user={this.state.user}
                    loggedIn={this.state.loggedIn}
                    purchase={this.state.purchased}
                    handlePurchase={this.handlePurchase}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/purchased"
              render={() =>
                this.state.loggedIn ? (
                  <Purchased
                    user={this.state.user}
                    purchased={this.state.purchased}
                    handlePurchase={this.handlePurchase}
                  />
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

          <Modal open={this.state.underage} onClose={this.handleClose}>
            <div
              style={{ margin: 'auto', textAlign: 'center', padding: '35%' }}
            >
              You must be 18 or over to access Lewdvie..
            </div>
          </Modal>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
