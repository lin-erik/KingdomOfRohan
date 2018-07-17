import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {
    return (
      <div>
        <h1 className="title is-1">Kingdom of Rohan and the Movie Moods</h1>
        <section className="section">

          {/* Search component */}

        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));