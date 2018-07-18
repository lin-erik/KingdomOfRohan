import React from 'react';

//from props this needs a dynamic img src, title, year and (conditional) mood tags
var MovieCard = (props) => {
  return (
    
    <div className="card">
      <div className="card-image">
        <figure className="image is-2by3">
          <img src={'https://image.tmdb.org/t/p/w500' + props.movie.poster_path} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <p className="title is-4">{props.movie.original_title}</p>
        <p className="title is-5">{props.movie.release_date}</p>
        <p>{props.movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;