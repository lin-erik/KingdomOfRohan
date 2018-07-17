import React from 'react';
import axios from 'axios';
var recList extends React.component {
  constructor (props) {
    this.state = (
      watchedMovies: [],
      queuedMovies: [],
      userTags:  [{mood: null, count: 0},
                  {mood: null, count: 0},
                  {mood: null, count: 0}]
    )
    
    //returns an array of the movies the user has tagged and watched
    //and then parses that information into the state as watchMovies
    //and userTags
    function getUserMovies {
      return axios.get('/User/',
              params: {
              username: props.username;
              }).then (function (response) {
                this.state.watchedMovies = response;
                var userTagTotals = {};
                for (var i = 0; i < response.length; i++) {
                  userTagTotals[response[i].tag1] = userTagTotals[response[i].tag1] ? userTagTotals[response[i].tag1]++ : 1;
                  if (response[i].tag2) {
                   userTagTotals[response[i].tag2] = userTagTotals[response[i].tag2] ? userTagTotals[response[i].tag2]++ : 1; 
                  }
                  if (response[i].tag3) {
                   userTagTotals[response[i].tag3] = userTagTotals[response[i].tag3] ? userTagTotals[response[i].tag3]++ : 1; 
                  }
                }
                return userTagTotals;
              }).then (function (response) {
                for (var i = 0; i < response.length; i++) {
                  for (var j = 0; j < 3; j++) {
                    if ()
                  }
                }
                
              })
    }
  }
  
  render () {
    return (
    
    )
  }
}