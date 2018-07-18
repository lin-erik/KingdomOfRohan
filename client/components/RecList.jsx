import React from 'react';
import axios from 'axios';
var RecList extends React.component {
  constructor (props) {
    this.state = (
      watchedMovies: [],
      queuedMovies: [],
//      userTags:  [{mood: null, count: 0},
//                  {mood: null, count: 0},
//                  {mood: null, count: 0}]
      userMoods: [];
    )
    
    //returns an array of the movies the user has tagged and watched
    //and then parses that information into the state as watchMovies
    //and userTags
//axios.get('/users/history/',
//          params: {
//            username: props.username
//          }).then (function (response) {
//            this.state.watchedMovies = response;
//            var currentMovie = response.pop();
//            for (var i = 0; i < currentMovie.moods.length; i++){
//              this.state.userMoods.push (currentMovie.moods[i])
//            }
//          }).then (function () {
//            this.state.queuedMovies = axios.get('/results/', params: this.state.userMoods)
//          }).then (function () {
//            for (var j = 0; j < this.state.watchedMovies.length; j++) {
//              var watchedMovie = this.state.watchedMovies[j];
//              this.state.queuedMovies = this.state.queuedMovies.filter(movie => movie.movieId !== watchedMovie.movieId);
//            }
//          })
};
    
  
  render () {
    
    axios.get('/users/history/',
      params: {
        username: props.username
    }).then (function (response) {
      this.setState ({watchedMovies: response});
      var currentMovie = response.pop();
      let tempMoodArr = []
      for (var i = 0; i < currentMovie.moods.length; i++){
        tempMoodArr.push (currentMovie.moods[i])
      }
      this.setState({userMoods: tempMoodArr});
    }).then (function () {
      this.setState ({queuedMovies: axios.get('/results/', params: this.state.userMoods)})
    }).then (function () {
      for (var j = 0; j < this.state.watchedMovies.length; j++) {
        var watchedMovie = this.state.watchedMovies[j];
        this.state.queuedMovies = this.state.queuedMovies.filter(movie => movie.movieId !== watchedMovie.movieId);
      }
    }).then (function () {
      var recView = this.state.queuedMovies.map (function(movie) {
              return (
                <li>
                  <img src={movie.poster_path}/>
                  <h1>{movie.title}</h1>
                </li>
              )
            })
      return (
        <style>
        ul#reclist li {
                    display:inline;
                  }
        </style>
        <ul id='reclist'>
          {recView}
        </ul>
      )
    })
  }
}