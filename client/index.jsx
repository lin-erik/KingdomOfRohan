import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login_Signup from './components/login_signup.jsx';
import GlobalSearch from './components/GlobalSearch.jsx';

import Profile_Search from './components/Profile_Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      profilePage: true,
      profileSearched: false
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
    if (!this.state.loggedIn) {

      return (
        <div>
          <h1 className="title is-1">Kingdom of Rohan and the Movie Moods</h1>
          <Login_Signup signup={this.handleSignUp} login={this.handleLogin} />
        </div>
      );
    } else if (this.state.loggedIn && this.state.profilePage) {
      return (
        <div>
          <h1 className="title is-1">Kingdom of Rohan and the Movie Moods</h1>

          <Profile_Search />
          {this.state.profileSearched ?
            <div>
              {/*render out the movie*/}
            </div>
            : null
          }
        </div>
      );
    } else if (this.state.loggedIn && !this.state.profilePage) {
      return (
        <div>
          <h1 className="title is-1">Kingdom of Rohan and the Movie Moods</h1>
          <GlobalSearch />
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));