import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
          {/* render the login/signup page.  change loggedIn state to true on login/signup */}
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