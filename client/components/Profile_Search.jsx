import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard.jsx';
import TagMovie from './TagMovie.jsx';
import UserHistory from './UserHistory.jsx';


class Profile_Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movie: '',
      giveMoodButtons: false,
      history: [],
      recs: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.getUserHistory = this.getUserHistory.bind(this);
    this.getUserRecs = this.getUserRecs.bind(this);
  }

  componentDidMount() {
    this.getUserHistory(this.props.user)
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ movie: e.target.value });
  }

  handleSearchClick(e) {
    e.preventDefault();
    this.setState({giveMoodButtons: false, movie: ''})
    axios.get('/search', { params: { title: this.state.movie } })
      .then((response) => {
       this.setState({movies: response.data})
        this.setState({ showMovie: true })
      })
      .catch((err) => console.error(err));
  }

  handleMoodClick(movie) {
    this.setState({movies: [movie]})
    this.setState({giveMoodButtons: true})
  }

  getUserHistory(username) {
    let params = { username }
    axios.get('/users/history/', { params })
      .then((response) => {
        let history = (response.data.slice(response.data.length - 4).reverse())
        if (history === null) history = [];
        //slice most recent 4-5 off response
        this.setState({ history })
        console.log(username, ' history: ', this.state.history)
      })
      .catch(err => console.log('Error getting user history: ', err));
  }

  
  getUserRecs(username) {
    let params = { username }
    axios.get('/users/recs/', { params })
      .then((response) => {
        console.log(response.data)
        //slice most recent 4-5 off response
        this.setState({ recs: response.data })
      })
      .catch(err => console.log('Error getting user history: ', err));
  }


  render() {
    //form will get onChange prop(function)
    //button will get onSubmit prop(funtion)
    return (
      <div className="container">
        <div className="level">
          <div className="level-item">
          <div className="level-left"></div>
            <p className="subtitle is-5">Welcome, {this.props.user}</p>
          </div>
        <div className="level-item">
          <input class='input is-info' placeholder='Enter a Movie Name Here'
            onChange={(event) => this.handleSearch(event)} />
          <button class="button is-info is-hovered is-focused is-rounded is-hovered"
            onClick={(event) => this.handleSearchClick(event)}>Search</button>
        </div>
        </div>

        <div className="columns">
          {/* <div className="column is-one-fourth"> */}
          <UserHistory user={this.props.user} getUserHistory={this.getUserHistory} history={this.state.history} />
          {/* </div> */}

          <div className="section">

            {/* <div className="is-size-3" >Welcome {this.props.user}, </div> */}
            {/* <div className="column is-four-fifths">

              <input class='input is-info' placeholder='Enter a Movie Name Here'
                onChange={(event) => this.handleSearch(event)} />
              <button class="button is-info is-hovered is-focused is-rounded is-hovered"
                onClick={(event) => this.handleSearchClick(event)}>Search</button>
            </div> */}

            {!this.state.giveMoodButtons ?

              // After Search + Selection Render this:
              <div className="container">
                <div className="columns is-multiline">
                  {this.state.movies.map((movie) => {
                    return (

                      <div className="column is-one-fourth">
                        <MovieCard movie={movie} />
                        <button class="button is-info is-hovered is-focused"
                          onClick={(event) => this.handleMoodClick(movie)}>Add Moods</button>

                      </div>
                    )
                  })}
                </div>
              </div>

              : <TagMovie movie={this.state.movies[0]} user={this.props.user} getUserHistory={this.getUserHistory} />}

          </div>
        </div>
      </div>
    );
  }

}
export default Profile_Search;