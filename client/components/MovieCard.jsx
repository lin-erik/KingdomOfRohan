import React from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Recommendations from './Recommendations.jsx';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imdb: {},
      open: false,
      trailer: {},
      recommendations: []
    }
    this.setIMDBdata = this.setIMDBdata.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
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
          trailer: response.data.trailer[0] || null
        });
      })
      .catch(err => {
        console.error("Error fetching trailers from server", err);
      });
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  };

  componentDidMount() {
    axios.post(`/recommendations/${this.props.movie.id}`)
    .then((response) => {
      this.setState({
        recommendations: response.data
      })
    })
  }


  render() {

    const customStyles = {
      content : {
        top                   : '60%',
        left                  : '60%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    //defensive check to make sure a movie was passed as props before rendering a card
    if (this.props.movie === null) return <div />;

    //gather all the moods assigned to the movie and map them below to display on card
    let moods = this.props.movie.moods || [];
    const { open } = this.state;

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
            <Modal open={open} onClose={this.onCloseModal} center>
              <div>
                <iframe
                  style={{ height: '300px', width: '100%' }}
                  className="embed-responsive-item"
                  src={
                    "https://www.youtube.com/embed/" + this.state.trailer.key
                  }
                  allowFullScreen
                />
              </div> <br/>
              <h6>{this.state.imdb.plot}</h6>
              <hr></hr>
              <div>
                <h2>{this.state.imdb.actors}</h2>

                <h2 style={{display: "inline-block", paddingRight: '250px'}}>{this.state.imdb.country}</h2>
                <h2 style={{display: "inline-block", paddingRight: '250px'}}>{this.state.imdb.runtime}</h2>
                <h2 style={{display: "inline-block"}}>{this.state.imdb.rated}</h2>
              </div>
              <hr></hr>
              <Recommendations recs={this.state.recommendations.slice(0, 3)}/>
            </Modal>
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
