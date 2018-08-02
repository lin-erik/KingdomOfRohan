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
      loading: true,
      renderCard: true
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
          trailer_key: response.data.trailer[0].key || "dQw4w9WgXcQ"
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
  }

  render() {
    //defensive check to make sure a movie was passed as props before rendering a card
    if (this.props.movie === null || this.state.renderCard === false) {
      return <div />;
    } else {

          return (
            <div className="card">
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
                  <a className="delete" onClick = {(e) => this.props.deleteMovie(this.props.id)}></a>
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
              </div>
            </div>
          );
    }

  }
}

export default MovieCard;
