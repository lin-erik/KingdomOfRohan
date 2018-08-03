import React from 'react';
import MovieCard from './MovieCard.jsx';
const axios = require('axios');

class TagMovie extends React.Component {
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
      selected: 'whimsical',
      //movie and user should eventually come from props after testing
      movie: this.props.movie,
      user: this.props.user
    };

    this.handleChangeMood = this.handleChangeMood.bind(this);
    this.handleSaveMovie = this.handleSaveMovie.bind(this);
    this.handleDeleteMood = this.handleDeleteMood.bind(this);
  }

  handleChangeMood(e) {
    let temp = this.state.moods;
    if (!temp.includes(e.target.value)) {
      temp.push(e.target.value);
    }
    this.setState({ moods: temp });
  }

  handleSaveMovie() {
    let movie = this.state.movie;

    window.scrollTo(0, 0);
    movie = Object.assign(movie, {
      moods: this.state.moods,
      current_user: this.state.user
    });

    console.log('saving movie ', movie);
    // document.getElementById('movieCard').style.opacity = '0';
    this.props.hideTagging();

    axios
      .post('/save', movie)
      .then((response) => {
        this.props.getUserHistory(this.props.user);
      })
      .catch((err) => console.log('FrontEnd err sending movie to server', err));
  }

  handleDeleteMood(e) {
    let index = e.target.value;
    let temp = this.state.moods;
    temp.splice(index, 1);
    this.setState({ moods: temp });
  }

  render() {
    return (
      <div className="container">
        <div className="container">
          <div className="is-title-6">
            How did you feel about {this.state.movie.original_title}?
          </div>
          <div className="field has-addons">
            <p className="control">
              <span className="select is-primary">
                <select
                  onChange={this.handleChangeMood}
                  className="select is-multiple"
                >
                  {this.state.dbMoods.map((option, index) => {
                    return (
                      <option value={option} key={index}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </span>
            </p>
            <p className="control">
              <button
                onClick={this.handleSaveMovie}
                className="button is-primary"
                style={{ marginLeft: '10px' }}
              >
                Submit Moodvie
              </button>
            </p>
          </div>
          <div className="container">
            {this.state.moods.map((mood, index) => (
              <span
                className="tag is-primary is-medium"
                style={{ margin: '7px' }}
              >
                {mood}
                <button
                  onClick={this.handleDeleteMood}
                  value={index}
                  className="delete"
                />
              </span>
            ))}
          </div>
        </div>
        <div className="column is-one-fifth">
          <MovieCard movie={this.props.movie} user={this.props.user}/>
        </div>
      </div>
    );
  }
}

export default TagMovie;
