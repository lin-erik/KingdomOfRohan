import React from 'react';
import MovieCard from './MovieCard.jsx';
const axios = require('axios');

class TagMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbMoods: ['whimsical', 'intense', 'thriller', 'heartfelt', 'gripping', 'boring', 'thoughtProvoking', 'uplifting', 'light', 'tearJerker', 'challenging', 'mindScrew', 'nostalgic', 'powerful', 'despair', 'exhausting', 'paranoid', 'motivated', 'uncomfortable'],
      moods: [],
      selected: 'whimsical',
      //movie and user should eventually come from props after testing
      movie: this.props.movie,
      user: this.props.user, 
      
    };

    this.handleChangeMood = this.handleChangeMood.bind(this);
    this.handleSaveMovie = this.handleSaveMovie.bind(this);
    this.handleDeleteMood = this.handleDeleteMood.bind(this);
  }

  handleChangeMood(e) {
    console.log('push to state: ', e.target.value)
    let temp = this.state.moods;
    if (!temp.includes(e.target.value)) {
      temp.push(e.target.value);
    }
    this.setState({ moods: temp });
  }

  handleSaveMovie() {
    let movie = this.state.movie
    window.scrollTo(0, 0);
    movie = Object.assign(
      movie,
      {
        moods: this.state.moods,
        current_user: this.state.user
      }
    );

    document.getElementById('movieCard').style.opacity = '0';

    axios
      .post('/save', movie)
      .then((response) => {
        this.props.getUserHistory(this.props.user)
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
      <div className="container" id='movieCard'>
        {/* <div className="columns"> */}
        <div>
          <MovieCard movie={this.props.movie} />
          <div className="container">
            {this.state.moods.map((mood, index) => (
              <span className="tag is-primary is-medium" style={{ margin: '7px' }}>
                {mood}
                <button
                  onClick={this.handleDeleteMood}
                  value={index}
                  className="delete"
                />
              </span>
            ))}
          </div>
          {/* </div> */}
        </div>

        <div className="container">
          <div className="title is-title-4">Add Moods:</div>
          <div className="field">
            <div className="control">
              <div className="select is-primary">
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
              </div>
            </div>
            <a className="button is-primary" onClick={this.handleSaveMovie}>Submit</a>
          </div>
        </div>
      </div>
    );
  }
}

export default TagMovie;


