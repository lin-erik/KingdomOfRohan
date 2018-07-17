import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login_Signup from './components/login_signup.jsx';
import GlobalSearch from './components/GlobalSearch.jsx';
import Profile_Search from './components/Profile_Search.jsx';
import Nav from './components/Nav.jsx';
import {BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleSignUp(username, password) {
    console.log('signing up with: ', username, password);
    //sends info to the server
    this.setState({
      loggedIn: true
    });
  }

  handleLogin(username, password) {
    console.log('logging in with: ', username, password);
    //authenticate user signup
    //on success...
    this.setState({
      loggedIn: true
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Switch>
            <Route path="/login" render={() => <Login_Signup signup={this.handleSignUp} login={this.handleLogin} />} />
            <Route path="/profile" render={() => <Profile_Search />} />
            <Route path="/global" render={() => <GlobalSearch />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));