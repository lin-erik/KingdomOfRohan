import React from 'react';
import MovieCard from './MovieCard.jsx';

var UserHistory = (props) => {
  //account for a blank profile with no history here before render
  console.log('history length: ', props.history)
  if (props.history[0] !== null) {
    return (
      <div className="column is-one-fifth">
        <p className="has-text-grey">Recently Added</p>
            {props.history.map((movie, index) => {
              return (
                  <MovieCard movie={movie} />
              )
            })}
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default UserHistory;