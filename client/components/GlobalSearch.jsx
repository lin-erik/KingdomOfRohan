import React from 'react';
import Results from './Results.jsx';
import MovieCard from './MovieCard.jsx';
import GoogleMaps from './GoogleMapsComponent.jsx';

import axios from 'axios';

class GlobalSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dbMoods: [
        'whimsical',
        'intense',
        'thriller',
        'heartfelt',
        'gripping',
        'boring',
        'thought provoking',
        'uplifting',
        'light',
        'tear jerker',
        'challenging',
        'mind screw',
        'nostalgic',
        'powerful',
        'despair',
        'exhausting',
        'paranoid',
        'motivated',
        'uncomfortable'
      ],
      moods: [],
      movies: [],
      nowPlaying: [],
      active: 'Now Playing',
      long: '',
      lat: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      var crd = pos.coords;

      let long = crd.longitude;
      let lat = crd.latitude;
      this.setState({
        long: long,
        lat: lat
      });
    });
  }

  //event handler for the addition of each mood to the global search
  handleChange(e) {
    // console.log('you selected ', e.target.value);
    let moodStorage = this.state.moods;
    if (moodStorage.length < 3 && moodStorage.indexOf(e.target.value) === -1) {
      moodStorage.push(e.target.value);
      this.setState({ moods: moodStorage });
    }

    //dynamically query the database based on each mood added
    this.handleSearch();
  }

  //function that takes the chosen moods in the global search,
  //sends then to the server and then queries the database for matching movies
  handleSearch() {
    //create the search params by transfroming them into a string with spaces
    let params = { moods: this.state.moods };

    if (this.state.moods.length > 0) {
      //send moods array to server and eventually query DB
      axios
        .get('/results/', { params })
        .then(response => {
          this.setState({ movies: response.data });
        })
        .catch(err => console.error(err));
    }
  }

  //event handler for when a user removes a mood from their current search
  handleDelete(e) {
    let index = e.target.value;
    let temp = this.state.moods;
    temp.splice(index, 1);
    this.setState({ moods: temp });

    //dynamically query with the new combination of moods
    this.handleSearch();
  }

  handleClick(e) {
    this.setState({
      active: e.target.text
    });
  }

  componentDidMount() {
    axios
      .get('/nowPlaying')
      .then(response => {
        this.setState({
          nowPlaying: response.data
        });
      })
      .catch(err => {
        console.error('Error with endpoint of server', err);
      });
  }

  render() {
    return (
      <div>
        <div className="tabs is-centered">
          <ul>
            <li
              className={this.state.active === 'Now Playing' ? 'is-active' : ''}
              onClick={this.handleClick}
            >
              <a>Now Playing</a>
            </li>
            <li
              className={
                this.state.active === 'Find Moodvie' ? 'is-active' : ''
              }
              onClick={this.handleClick}
            >
              <a>Find Moodvie</a>
            </li>
          </ul>
        </div>

        <div
          style={
            this.state.active === 'Now Playing'
              ? { display: 'inline' }
              : { display: 'none' }
          }
        >
          <div className="container is-fluid">
            <div>
              <GoogleMaps long={this.state.long} lat={this.state.lat} />
            </div>
            <br />
            <div className="columns is-multiline">
              {this.state.nowPlaying.map((movie, index) => {
                return (
                  <div className="column is-one-fifth" key={index}>
                    <MovieCard
                      movie={movie}
                      loggedIn={this.props.loggedIn}
                      user={this.props.user}
                      handlePurchase={this.props.handlePurchase}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={
            this.state.active === 'Find Moodvie'
              ? { display: 'inline' }
              : { display: 'none' }
          }
        >
          <div className="section">
            <div className="title is-title-4">Find a Moodvie to watch</div>
            <div className="field">
              <div className="control">
                <div className="select is-primary">
                  <select
                    onChange={this.handleChange}
                    className="select is-multiple"
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Choose Mood
                    </option>
                    {this.state.dbMoods.map((option, index) => {
                      return (
                        <option value={option} key={index}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="container" style={{ margin: '15px' }}>
              {this.state.moods.length > 0 ? (
                <span className="subtitle">
                  Our users found these movies to be{' '}
                </span>
              ) : null}

              {this.state.moods.map((mood, index) => (
                <span
                  className="tag is-primary is-large"
                  style={{ margin: '7px' }}
                  key={index}
                >
                  {mood}
                  <button
                    onClick={this.handleDelete}
                    value={index}
                    className="delete"
                  />
                </span>
              ))}
            </div>

            <div className="container">
              {this.state.moods.length === 0 ? (
                <div />
              ) : (
                <Results movies={this.state.movies} moods={this.state.moods} user={this.props.user}/>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalSearch;
