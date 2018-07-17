import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard.jsx';

class Profile_Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movie: '',
      showMovie: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //get movies
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({movie: e.target.value});
    console.log('onChange', this.state.movie);
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.state.movie);
    // this.setState({ showMovie: true });
    axios.get('/search', { params: { title: this.state.video }})
      .then((response) => {
        //skeleton!!
        //send info
        //render movieCard
        this.setState({showMovie: true})
      })
      .catch((err) => console.error(err));
  }

  render() {
    //form will get onChange prop(function)
    //button will get onSubmit prop(funtion)
    return (
      <div>
        <input onChange={(event) => this.handleSearch(event)} />
        <button onClick={(event) => this.handleClick(event)}>Search</button>
        {this.state.showMovie ? <MovieCard /> : null}
      </div>
    );
  }

}
export default Profile_Search;