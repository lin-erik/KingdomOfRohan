import React from "react";
import axios from "axios";

import Popup from "./Popup.jsx";

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imdb: {},
      open: false,
      trailer: {},
      recommendations: [],
      trailer_key: "dQw4w9WgXcQ",
      open: false,
      loading: true
    };

    this.setIMDBdata = this.setIMDBdata.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  setIMDBdata() {
    axios
      .get("/youtube", {
        params: {
          search: this.props.movie.id
        }
      })
      .then(response => {
        this.setState({
          imdb: response.data.imdb,
          trailer: response.data.trailer[0],
          trailer_key: response.data.trailer[0].key
        });
      })
      .catch(err => {
        console.error("Error fetching trailers from server", err);
      })
      .then(() => {
        this.setState({
          loading: false
        });
      });
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  };

  render() {
    //defensive check to make sure a movie was passed as props before rendering a card
    if (this.props.movie === null) return <div />;

    //gather all the moods assigned to the movie and map them below to display on card
    let moods = this.props.movie.moods || [];

    return (
      <div className="card" >
        <div className="card-image">
          <figure className="image is-2by3">
            <img
              onClick={() => {
                this.setIMDBdata();
                this.onOpenModal();
              }}
              src={
                "https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path
              }
              alt="Placeholder image"
            />
            <Popup
              trailer_key={this.state.trailer_key}
              onCloseModal={this.onCloseModal}
              imdb={this.state.imdb}
              open={this.state.open}
              loading={this.state.loading}
              movie={this.props.movie}
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="is-size-7">{this.props.movie.original_title}</p>
          <p className="is-size-7">{this.props.movie.release_date}</p>
          <div className="tags content">
            {moods.map(mood => (
              <span className="tag is-primary" key={mood} style={{height: '1.5rem'}}>
                {mood}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
