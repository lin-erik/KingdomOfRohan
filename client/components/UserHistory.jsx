import React from 'react';
import MovieCard from './MovieCard.jsx';

const UserHistory = (props) => {
  //first check if the logged in user has user history, if so, render that history
  //if not, render an empty div
  if (props.history[0] !== null) {
    return (
      <div className="column is-one-fifth">
        <p className="has-text-grey">Recently Added</p>
        {props.history.map((movie, i) => {
          return (
            <div style={{ margin: '15px' }} key={i}>
              <MovieCard movie={movie} deleteMovie={props.deleteMovie} id={movie.id}/>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div />;
  }
};

export default UserHistory;

// class UserHistory extends React.Component {
//
// }
