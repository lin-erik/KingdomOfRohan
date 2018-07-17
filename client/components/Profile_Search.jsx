import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard.jsx';

class Profile_Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movie: '',
      showMovie: false,
      dbMoods: ['happy', 'sad', 'uplifting', 'dark', 'tear-jerker'],
      moods: [],
      selected: 'happy'
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleChangeMood = this.handleChangeMood.bind(this);
    this.addMood = this.addMood.bind(this);
    this.handleSaveMovie = this.handleSaveMovie.bind(this);
    this.handleDeleteMood = this.handleDeleteMood.bind(this);
  }

  componentDidMount() {
    //get movies
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ movie: e.target.value });
    console.log('onChange', this.state.movie);
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.state.movie);
    axios.get('/search', { params: { title: this.state.video } })
      .then((response) => {
        //skeleton!!
        //send info
        //render movieCard
        this.setState({ showMovie: true })
      })
      .catch((err) => console.error(err));
  }

  handleChangeMood(e) {
    this.setState({ selected: e.target.value });
    console.log(this.state.selected);
  }

  addMood() {
    let temp = this.state.moods;
    if (!temp.includes(this.state.selected)) {
      temp.push(this.state.selected);
    }
    this.setState({ moods: temp });
  }

  handleSaveMovie() {
    console.log('Saving movie with ', this.state.moods);
  }

  handleDeleteMood(e) {
    let index = e.target.value;
    let temp = this.state.moods;
    temp.splice(index, 1);
    this.setState({ moods: temp });
  }

  render() {
    //form will get onChange prop(function)
    //button will get onSubmit prop(funtion)
    return (
      <div className="section">
        <div className="container">
          <input onChange={(event) => this.handleSearch(event)} />
          <button onClick={(event) => this.handleClick(event)}>Search</button>
        </div>
        <div className="section">
          <div className="columns">
            <div className="column is-two-fifths">
              <MovieCard />
          <div className="container">
            {this.state.moods.map((mood, index) =>
              <span className="tag is-warning" style={{ margin: '7px' }}>{mood}
                <button onClick={this.handleDeleteMood} value={index} className="delete"></button>
              </span>)}
          </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="title is-title-4">Add Moods:</div>
          <select onChange={this.handleChangeMood} className="select is-multiple">
            {this.state.dbMoods.map((option, index) => {
              return <option value={option} key={index}>{option}</option>;
            })}
          </select>
          <button onClick={this.addMood}>Add Mood</button>
          <button onClick={this.handleSaveMovie}>Submit</button>
        </div>
      </div>

    );
  }

}
export default Profile_Search;