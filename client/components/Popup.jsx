import React from 'react';
import Recommendations from './Recommendations.jsx';
import MoodRatings from './MoodRatings.jsx';
import Stripe from './RedStripe';

import axios from 'axios';
import Modal from 'react-responsive-modal';
import { MoonLoader } from 'react-spinners';

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendations: [],
      purchase: false
    };

    this.purchaseMovie = this.purchaseMovie.bind(this);

    this.openPurchase = this.openPurchase.bind(this);
    this.purchaseClose = this.purchaseClose.bind(this);
  }

  purchaseMovie() {
    var movie = this.props.movie;

    movie = Object.assign(movie, {
      current_user: this.props.user,
      purchase_trailer: this.props.purchaseTrailer
    });

    axios
      .post('/purchase', movie)
      .then(response => {
        axios
          .get('/purchase', {
            params: {
              username: this.props.user
            }
          })
          .then(response => {
            if (response.data) {
              this.props.handlePurchase(response.data);
            }
          })
          .catch(err => console.log('Error retrieving purchase history', err));
      })
      .catch(err => {
        console.error('Error purchasing', err);
      });
  }

  openPurchase() {
    this.setState({
      purchase: true
    });
  }

  purchaseClose() {
    this.setState({
      purchase: false
    });
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
          <div style={{ margin: 'auto', align: 'center' }}>
            <center>
              <MoonLoader color={'#ADD8E6'} loading={this.props.loading} />
            </center>
          </div>

          <hr />
          <h6>{this.props.imdb.plot}</h6>
          <hr />
          <div>
            <h2>{this.props.imdb.actors}</h2>

            <h2>
              {this.props.imdb.country}
            </h2>
            <h2>
              {this.props.imdb.runtime}
            </h2>
            <h2>
              {this.props.imdb.rated}
            </h2>
          </div>
        </Modal>
      );
    } else {
      return (
        <Modal open={this.props.open} onClose={this.props.onCloseModal}>
          <div>
            <iframe
              style={{ height: '300px', width: '100%' }}
              className="embed-responsive-item"
              src={'https://www.youtube.com/embed/' + this.props.trailerKey}
              allowFullScreen
            />
          </div>
          <hr />
          <p style={{ color: 'black' }}>{this.props.imdb.plot}</p>
          <hr />
          <div>
            <h2 style={{ color: 'black' }}>Cast: {this.props.imdb.actors}</h2>

            <h2
              style={{
                color: 'black'
              }}
            >
              Countries Released: {this.props.imdb.country}
            </h2>
            <h2
              style={{
                color: 'black'
              }}
            >
              Runtime: {this.props.imdb.runtime}
            </h2>
            <h2 style={{ color: 'black' }}>
              MPAA Rating: {this.props.imdb.rated}
            </h2>
          </div>
          <hr />
          <Recommendations
            recs={this.state.recommendations.slice(0, 3)}
            user={this.props.user}
          />

          <div>
            <MoodRatings
              movie={this.props.movie}
              reviewCount={this.props.movie.review_count}
              moods={this.props.movie.moods || []}
            />
          </div>

          <button
            style={
              this.props.loggedIn ? { display: 'inline' } : { display: 'none' }
            }
            onClick={this.openPurchase}
          >
            Purchase
          </button>

          <Modal open={this.state.purchase} onClose={this.purchaseClose}>
            <div style={{ width: '600px', height: '600px' }}>
              <Stripe user={this.props.user} purchaseMovie={this.purchaseMovie} />
            </div>
          </Modal>
        </Modal>
      );
    }
  }
}

export default Popup;
