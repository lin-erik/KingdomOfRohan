import React from 'react';

//from props this needs a dynamic img src, title, year and (conditional) mood tags
var MovieCard = (props) => {
  return (
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="https://vignette.wikia.nocookie.net/lotr/images/8/8b/King_of_rohan.jpg/revision/latest?cb=20140426175218" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <p class="title">Movie Title</p>
        <p class="subtitle">2008</p>
        <p>Mood tags will go here</p>
      </div>
    </div>
  );
};

export default MovieCard;