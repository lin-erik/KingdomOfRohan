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
    console.log('you selected ', e.target.value)
    let temp = this.state.moods;
    if (temp.length < 3 && !temp.includes(this.state.selected)) {
      temp.push(e.target.value);
    }
    this.setState({ moods: temp });
    this.handleSearch()
    // this.setState({ selected: e.target.value });
    // console.log('selected mood', this.state.selected);
    // this.addMood()

  }

  addMood() {
    let temp = this.state.moods;
    if (temp.length < 3 && !temp.includes(this.state.selected)) {
      temp.push(this.state.selected);
    }
    this.setState({ moods: temp });
    this.handleSearch()
  }

  handleSearch() {
    console.log('Querying server for ', this.state.moods);
    //create the search params by transfroming into string with spaces
    let params = { moods: this.state.moods.join(' ') };

    //send moods array to server and eventually query DB
    axios.get('/results/', { params })
      .then((response) => {
        //do something
        console.log('Movie State: ', response.data)
        this.setState({movies: response.data})
      })
      .catch((err) => console.error(err));
  }

  handleDelete(e) {
    let index = e.target.value;
    let temp = this.state.moods;
    temp.splice(index, 1);
    this.setState({ moods: temp });
    this.handleSearch()
  }

  render() {
    return (
      <div className="section">
        <div className="title is-title-4">Find a Moodvie to watch</div>
        <div className="field">
          <div className="control">
            <div className="select is-primary">
              <select
                onChange={this.handleChange} className="select is-multiple">
                {this.state.dbMoods.map((option, index) => {
                  return <option value={option} key={index}>{option}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="container" style={{ margin: '15px' }} >
          
          { this.state.moods.length > 0 ? 
            <span className="subtitle">Our users found these movies to be </span> : null
          }

          {this.state.moods.map((mood, index) =>
            <span className="tag is-primary is-large" style={{ margin: '7px' }}>{mood}
              <button onClick={this.handleDelete} value={index} className="delete"></button>
            </span>)}
        </div>

        <div className="container">
          {this.state.moods.length === 0 ? <div></div> : <Results movies={this.state.movies} />}
        </div>
      </div>
    );
  }
}

export default GlobalSearch;