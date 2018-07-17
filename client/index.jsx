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
    if (!loggedIn) {
      
      return(
        <div>
        <h1 className="title is-1">Kingdom of Rohan and the Movie Moods</h1>
          {/* render the login/signup page.  change loggedIn state to true on login/signup */}
        </div>
      )
    } else if (loggedIn && profilePage) {
      return(
        <div>
        <h1 className="title is-1">Kingdom of Rohan and the Movie Moods</h1>
          {/*render out the profile page*/}
          { profileSearched ? 
            <div>
              {/*render out the movie*/}
            </div>
            : null
          }
        </div>
      )
    } else if (loggedIn && !profilePage) {
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