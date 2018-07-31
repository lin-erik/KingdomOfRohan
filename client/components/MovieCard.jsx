import React from 'react';

class MovieCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    //defensive check to make sure a movie was passed as props before rendering a card
    if (this.props.movie === null) return <div />;

    //gather all the moods assigned to the movie and map them below to display on card
    let moods = this.props.movie.moods || [];
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-2by3">
            <img
              src={'https://image.tmdb.org/t/p/w500' + this.props.movie.poster_path}
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="is-size-6">{this.props.movie.original_title}</p>
          <p className="is-size-7">{this.props.movie.release_date}</p>
          <div className="tags content">
            {moods.map((mood) => (
              <span className="tag is-primary" key={mood}>
                {mood}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default MovieCard;
