import React from 'react';

//from props this needs a dynamic img src, title, year and (conditional) mood tags
var MovieCard = (props) => {
  if (props.movie === null) return (<div></div>)
  let moods = props.movie.moods || []
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-2by3">
          <img src={'https://image.tmdb.org/t/p/w500' + props.movie.poster_path} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <p className="is-size-6">{props.movie.original_title}</p>
        <p className="is-size-7">{props.movie.release_date}</p>
        <div className="tags content">
          {/* <p>{props.movie.overview}</p> */}
          {moods.map((mood, index) => 
            <span className="tag is-warning" key={mood} >{mood}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;