import React from 'react';

//from props this needs a dynamic img src, title, year and (conditional) mood tags
var MovieCard = (props) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-2by3">
          <img src="https://vignette.wikia.nocookie.net/lotr/images/8/8b/King_of_rohan.jpg/revision/latest?cb=20140426175218" alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <p className="title is-4">Movie Title</p>
        <p className="title is-5">2008</p>
        <p>Description goes in here</p>
      </div>
    </div>
  );
};

export default MovieCard;