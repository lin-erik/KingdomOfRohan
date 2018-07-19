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
  }

  componentDidMount() {
    console.log('Mounted')
    this.getUserHistory(this.props.user)
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ movie: e.target.value });
    console.log('onChange', this.state.movie);
  }

  handleSearchClick(e) {
    e.preventDefault();
    console.log(this.state.movie);
    axios.get('/search', { params: { title: this.state.movie } })
      .then((response) => {
        console.log('Client Received: ', response.data)
       this.setState({movies: response.data})
        this.setState({ showMovie: true })
      })
      .catch((err) => console.error(err));
  }

  handleMoodClick(movie) {
    console.log('ClickableMovie', movie)
    this.setState({movies: [movie]})
    this.setState({giveMoodButtons: true})
  }

  getUserHistory(username) {
    let params = { username }
    console.log('Sending get request for history with: ', { params })
    axios.get('/users/history/', { params })
      .then((response) => {
        let history = (response.data.slice(response.data.length - 4).reverse())
        //slice most recent 4-5 off response
        this.setState({ history })
        console.log(this.state.history)
      })
      .catch(err => console.log('Error getting user history: ', err));
  }

  render() {
    //form will get onChange prop(function)
    //button will get onSubmit prop(funtion)
    return (
      <div className="section">
        <div className="container">
          <UserHistory user={this.props.user} getUserHistory={this.getUserHistory}/>
          <input onChange={(event) => this.handleSearch(event)} />
          <button onClick={(event) => this.handleSearchClick(event)}>Search</button>
        </div>

       {!this.state.giveMoodButtons ?

        // After Search + Selection Render this:
    <div className="container is-fluid">
      <div className="columns is-multiline">
        {this.state.movies.map((movie, index) => {
          console.log('movie mapper: ', movie)
          return(
            
            <div className="column is-one-fifth">
              <MovieCard key={index} movie={movie} />
              <button onClick={(event) => this.handleMoodClick(movie)}>Rate This Movie</button>
  
            </div>
          ) 
        })}
      </div>
    </div>

          : <TagMovie movie={this.state.movies[0]} user={this.props.user} />}

      </div>

    );
  }

}
export default Profile_Search;