import React from 'react';

import axios from 'axios';

class Purchased extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  fetchPurchased() {
    axios
      .get('/purchase', {
        params: {
          username: this.props.user
        }
      })
      .then(response => {
        console.log('Response from purchase history fetch', response.data);
        this.props.handlePurchase(response.data);
      })
      .catch(err => {
        console.error('Error fetching purchased', err);
      });
  }

  componentDidMount() {
    this.fetchPurchased();
    console.log('Purchase state', this.props.purchased);
  }

  render() {
    return (
      <div className="section">
        <div className="title is-title-4">Purchased Movies</div>

        <div className="container">
          <div className="columns is-multiline">
            {this.props.purchased.map((movie, ind) => (
              <div className="column is-one-quarter" key={ind}>
                  <iframe
                    style={{ height: '300px', width: '100%' }}
                    className="embed-responsive-item"
                    src={
                      'https://www.youtube.com/embed/' + movie.purchase_trailer
                    }
                    allowFullScreen
                  />
                </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Purchased;
