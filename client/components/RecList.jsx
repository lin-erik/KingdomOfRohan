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
                for (var i in response) {
                  for (var j = 0; j < 3; j++) {
                    if (this.state.userTags[j].count < response[i]) {
//                      this.state.userTags.splice(j, 1, {
//                        mood: i,
//                        count: response[i]
//                      })
                      this.state.userTags = this.state.userTags.slice(0, j)
                        .concat([{mood: i, count: response[i]}])
                        .concat(this.state.userTags.slice(j+1, 3));
                      break;
                    }
                  }
                }
              return this.state.userTags;
              })
    };
    
    //gets all movies from the global movie list based on a basic query
    function getGlobalMovies {
      return axios.get('/Movie/',
                      params)
    }
  }
  
  render () {
    return (
    
    )
  }
}