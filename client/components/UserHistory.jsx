import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard.jsx';

class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      recs: []
    };
  }

  componentDidMount() {
    console.log('Mounted')
    this.getUserHistory(this.props.user)
  }

  getUserHistory(username) {
    let params = { username }
    console.log('Sending get request for history with: ', { params })
    axios.get('/users/history/', { params })
      .then((response) => {
        let history = (response.data.slice(response.data.length - 4))
        //slice most recent 4-5 off response
        this.setState({ history })
        console.log(this.state.history)
      })
      .catch(err => console.log('Error getting user history: ', err));
  }

  getUserRecs(username) {
    let params = { username }
    console.log('Sending get request for recs with: ', { params })
    axios.get('/users/recs/', { params })
      .then((response) => {
        console.log(response.data)
        //slice most recent 4-5 off response
        this.setState({ recs: response.data })
      })
      .catch(err => console.log('Error getting user history: ', err));
  }

  render() {
    return (
      <div className="container">
      <p>Recently Tagged</p>
        <div className="container is-fluid">
          <div className="columns is-multiline">
            {this.state.history.map((movie, index) => {
              return (
                <div className="column is-one-fifth">
                  <MovieCard key={index} movie={movie} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

}

export default UserHistory;