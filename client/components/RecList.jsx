import React from 'react';
import axios from 'axios';
var recList extends React.component {
  constructor (props) {
    this.state = (
      watchedMovies: [],
      queuedMovies: [],
      userTags: []
    )
    function getUserMovies {
      return axios.get('/User/',
             params: {
              username: props.username;
              }).then(function (response) {
                let userTags = {};
                for (var i = 0; i < response.length; i++) {
                  if (userTags)
                }
              })
    }
  }
  
  render () {
    return (
    
    )
  }
}