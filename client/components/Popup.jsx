import React from "react";
import Recommendations from "./Recommendations.jsx";
import MoodRatings from "./MoodRatings.jsx";

import axios from "axios";
import Modal from "react-responsive-modal";
import { MoonLoader } from "react-spinners";

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendations: []
    };
  }

  componentDidMount() {
    axios.post(`/recommendations/${this.props.movie.id}`).then(response => {
      this.setState({
        recommendations: response.data
      });
    });
  }

  render() {
    if (this.props.loading) {
      return (
        <Modal open={this.props.open} onClose={this.props.onCloseModal}>
          <div style={{ margin: "auto", align: "center" }}>
            <center>
              <MoonLoader color={"#ADD8E6"} loading={this.props.loading} />
            </center>
          </div>

          <br />
          <h6>{this.props.imdb.plot}</h6>
          <hr />
          <div>
            <h2>{this.props.imdb.actors}</h2>

            <h2 style={{ display: "inline-block", paddingRight: "250px" }}>
              {this.props.imdb.country}
            </h2>
            <h2 style={{ display: "inline-block", paddingRight: "250px" }}>
              {this.props.imdb.runtime}
            </h2>
            <h2 style={{ display: "inline-block" }}>{this.props.imdb.rated}</h2>
          </div>
        </Modal>
      );
    } else {
      return (
        <Modal open={this.props.open} onClose={this.props.onCloseModal}>
          <div>
            <iframe
              style={{ height: "300px", width: "100%" }}
              className="embed-responsive-item"
              src={"https://www.youtube.com/embed/" + this.props.trailer_key}
              allowFullScreen
            />
          </div>
          <br />
          <h6>{this.props.imdb.plot}</h6>
          <hr />
          <div>
            <h2>{this.props.imdb.actors}</h2>

            <h2 style={{ display: "inline-block", paddingRight: "250px" }}>
              {this.props.imdb.country}
            </h2>
            <h2 style={{ display: "inline-block", paddingRight: "250px" }}>
              {this.props.imdb.runtime}
            </h2>
            <h2 style={{ display: "inline-block" }}>{this.props.imdb.rated}</h2>
          </div>
          <hr />
          <Recommendations recs={this.state.recommendations.slice(0, 3)} />

          <div>
            <MoodRatings
              movie={this.props.movie}
              reviewCount={this.props.movie.review_count}
              moods={this.props.movie.moods || []}
            />
          </div>
        </Modal>
      );
    }
  }
}

export default Popup;
