import React from 'react';
import axios from 'axios';
import Results from './Results.jsx';

class GlobalSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dbMoods: ['whimsical', 'intense', 'thriller', 'heartfelt', 'gripping', 'boring', 'thoughtProvoking', 'uplifting', 'light', 'tearJerker', 'challenging', 'mindScrew', 'nostalgic', 'powerful', 'despair', 'exhausting', 'paranoid', 'motivated', 'uncomfortable'],
      moods: [],
      selected: 'whimsical',
      movies: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.addMood = this.addMood.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    //update genre list from db
  }

  handleChange(e) {
    this.setState({ selected: e.target.value });
    console.log(this.state.selected);
  }

  addMood() {
    let temp = this.state.moods;
    if (temp.length < 3 && !temp.includes(this.state.selected)) {
      temp.push(this.state.selected);
    }
    this.setState({ moods: temp });
  }

  handleSearch() {
    
    console.log('Querying server for ', this.state.moods);
    //create the search params by transfroming into string with spaces
    let params = { moods: this.state.moods.join(' ') };

    //send moods array to server and eventually query DB
    axios.get('/results/', { params })
      .then((response) => {
        //do something
      })
      .catch((err) => console.error(err));
  }

  handleDelete(e) {
    let index = e.target.value;
    let temp = this.state.moods;
    temp.splice(index, 1);
    this.setState({ moods: temp });
  }

  render() {
    return (
      <div className="section">
        <div className="title is-title-4">Search for These Moods:</div>
        <select onChange={this.handleChange} className="select is-multiple">
          {this.state.dbMoods.map((option, index) => {
            return <option value={option} key={index}>{option}</option>;
          })}
        </select>
        <button onClick={this.addMood}>Add Mood</button>
        <button onClick={this.handleSearch}>Find Me Movies</button>
        <div className="container">
          {this.state.moods.map((mood, index) =>
            <span className="tag is-warning" style={{ margin: '7px' }}>{mood}
              <button onClick={this.handleDelete} value={index} className="delete"></button>
            </span>)}
        </div>

        <div className="container">
          <Results movies={this.state.movies} />
        </div>
      </div>
    );
  }
}

export default GlobalSearch;