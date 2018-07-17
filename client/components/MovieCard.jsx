import React from 'react';

//from props this needs a dynamic img src, title, year and (conditional) mood tags
var MovieCard = (props) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src="https://vignette.wikia.nocookie.net/lotr/images/8/8b/King_of_rohan.jpg/revision/latest?cb=20140426175218" alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <p className="title">Movie Title</p>
        <p className="subtitle">2008</p>
        <p>Mood tags will go here</p>
      </div>
    </div>
  );
};

export default MovieCard;