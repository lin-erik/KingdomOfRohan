import React from "react";
import MovieCard from "./MovieCard.jsx";

var Recommendations = props => {
  return (
    <div className="container is-fluid">
      <div className="columns">
        {props.recs.length !== 0 ? (
          props.recs.map(movie => {
            return (
              <div className="column is-one-third">
                <MovieCard movie={movie} />
              </div>
            );
          })
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Recommendations;
