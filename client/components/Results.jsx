import React from 'react';
import MovieCard from './MovieCard.jsx';

var Results = (props) => {
  return (
    <div className="container is-fluid">
      <div className="columns is-multiline">
        {props.movies.length !== 0 ? props.movies.map((movie) => {
          return (<div className="column is-one-fifth">
            <MovieCard movie={movie} />
          </div>)
        })
          :
          <div>No movies found for this combination</div>}
      </div>
    </div>
  );
};

export default Results;
