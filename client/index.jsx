import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login_Signup from './components/login_signup.jsx';
import GlobalSearch from './components/GlobalSearch.jsx';
import Profile_Search from './components/Profile_Search.jsx';
import Nav from './components/Nav.jsx';
import {BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: 'test'
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  

  handleSignUp(username, password) {
    console.log('signing up with: ', username, password);
    axios.post('/signup', { username: username, password: password })
      .then((response) => {
        console.log('signed up successfully!');
        this.setState({
          loggedIn: true,
          user: username
        });
      })
      .catch((err) => {
        console.error('something went wrong on signup: ', err);
      });
  }

  handleLogin(username, password) {
    console.log('logging in with: ', username, password);
    axios.post('/login', { username: username, password: password })
      .then((response) => {
        if (response.data) {
          this.setState({
            loggedIn: true,
            user: username
          });
        } else {
          alert('Incorrect Password or Username. Please try again or Sign Up for an account.');
        }
      })
      .catch((err) => {
        console.log('something went wrong: ', err)
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav loggedIn={this.state.loggedIn}/>
          <Switch>
            <Route path="/global" render={() => <GlobalSearch />} />
            <Route path="/profile" render={() => <Profile_Search />} />
            <Route path="/login" render={() => <Login signup={this.handleSignUp} login={this.handleLogin}/>} />
            <Route path="/signup" render={() => <Signup signup={this.handleSignUp} login={this.handleLogin}/>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));