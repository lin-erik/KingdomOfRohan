import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard.jsx';
import TagMovie from './TagMovie.jsx';
import Results from './Results.jsx'

class Profile_Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movie: '',
      oneMovie: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount() {
    //get movies
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
    this.setState({oneMovie: true})
  }


  
  render() {
    //form will get onChange prop(function)
    //button will get onSubmit prop(funtion)
    return (
      <div className="section">
        <div className="container">
          <input onChange={(event) => this.handleSearch(event)} />
          <button onClick={(event) => this.handleSearchClick(event)}>Search</button>
        </div>

       

        After Search + Selection Render this:
        {this.state.movies.map((movie, index) => {
          console.log('movie mapper: ', movie)
          return(
            <div>
              <MovieCard key={index} movie={movie}/>
              <button onClick={(event) => this.handleMoodClick(movie)}>Rate This Movie</button>
              
            </div>
          ) 
        })}
      
        
      </div>

    );
  }

}
export default Profile_Search;