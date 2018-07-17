import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login_Signup from './components/login_signup.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      profilePage: true,
      profileSearched: false
    };

  }

  render() {
    if (!this.state.loggedIn) {
      
      return(
        <div>
          <h1 className="title is-1">Kingdom of Rohan and the Movie Moods</h1>
          <Login_Signup />
        </div>
      )
    } else if (this.state.loggedIn && this.state.profilePage) {
      return(
        <div>
        <h1 className="title is-1">Kingdom of Rohan and the Movie Moods</h1>
          {/*render out the profile page*/}
          { this.state.profileSearched ? 
            <div>
              {/*render out the movie*/}
            </div>
            : null
          }
        </div>
      )
    } else if (this.state.loggedIn && !this.state.profilePage) {
      return(
        <div>
        <h1 className="title is-1">Kingdom of Rohan and the Movie Moods</h1>
          {/*render main search/recommendation page page*/}
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));