const express = require('express');
const app = express();

const parser = require('body-parser');
const axios = require('axios');
const imdb = require('imdb-api');
const session = require('express-session');

const {
  authenticate,
  signup,
  save,
  histSave,
  fetchHist,
  moodSearch,
  giveRecommendations,
  deleteMovie,
  getUserByName,
  setUserTheme
} = require('./../db/index');

const helpers = require('./serverhelpers.js');

const imdb_key = require('../../imdb.js').IMDB_KEY;

let API_KEY;
try {
  API_KEY = require('../../config.js').API_KEY;
} catch (err) {
  API_KEY = process.env.API_KEY;
}

//********middleware and plugins*********
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(express.static(__dirname + '/../../dist'));
app.use(
  session({
    secret: 'rick astley'
  })
);

//*******GET/POST section*******

//profile search - example url: localhost:8080/search/?title=batman+begins
app.get('/search', (req, res) => {
  let movie = req.query.title;
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${movie}`
    )
    .then(response => {
      helpers
        .filterResults(response.data.results)
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          console.log('err: ' + err);
        });
    })
    .catch(err => console.log('chill'));
});

//takes in a movie object that contains an array of moods
//saves that movie to both the user's history
//and updates the movie's mood count on the global db
app.post('/save', (req, res) => {
  save(req.body, err => {
    if (err) console.error(err);
    else {
      histSave(req.body, (err, response) => {
        if (err) console.error(err);
        else res.status(200).send(req.body);
      });
    }
  });
});

//*******Global Querying by Mood*******

//mood search - example url: localhost:8080/results/?moods=happy+sad+cool
app.get('/results/:moods?', (req, res) => {
  //creating an array with each mood that was sent with query
  console.log('Array of moods', req.query.moods);

  moodSearch(req.query.moods, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

//*****Single User Functionality ******/

//get history for dynamic username parameter
//example url: localhost:8080/users/history/?username=parker
//fetches the user's history array and sends back to client
app.get('/users/history/:username?', (req, res) => {
  //this is how you grab the username from the url
  console.log('username searching for: ', req.query.username);
  fetchHist(req.query.username).then(history => res.send(history));
});

//gets the recommendations for a particular user based on their most recently watched movie
app.get('/users/recs.:username', (req, res) => {
  console.log('Getting recs for: ', req.query.username);

  //use helper function here to filter rec list that comes from DB
  fetchHist(req.query.username).then(history =>
    helpers.filterRecs(history, function(err, data) {
      if (err) throw err;
      res.send(data);
    })
  );
});

app.post('/recommendations/:movie', function(req, res) {
  console.log('RECOMMENDATION ID', req.params.movie);
  let histories = giveRecommendations(req.params.movie, (err, result) => {
    res.send(result);
  });
});

// Retrieves a single user from the DB based on the queried username
app.get('/user', (req, res) => {
  getUserByName(req.query.username, (err, result) => {
    if (err) {
      throw err;
    } else
    res.send(result);
  });
})

// Updates a user's theme in the DB based on the query
app.post('/theme', (req, res) => {
  if (req.body.username === 'Anonymous') {
    res.send('Theme setting not enabled for Anonymous users');
  } else {
    setUserTheme(req.body.username, req.body.theme, (err, result) => {
      if (err) {
        throw err;
      }
      res.send('Updated user theme');
    })
  }
})

//*******Authentication section*******
//runs authenticate based on object containing un/pw from client
//on the returned docs, compares against the docs password with provided password
//sends back boolean to allow user access or not
app.post('/login', (req, res) => {
  let username = req.body.username;
  authenticate(username, (err, data) => {
    if (err) {
      console.log('Error in the db retrieval '.err);
    } else {
      if (data === null) {
        res.send(false);
      } else if (
        Object.keys(data).length > 1 &&
        data.password === req.body.password
      ) {
        var sess = {
          username: username,
          login: true,
        };

        console.log('Login session', sess);

        req.session.userData = sess;
        res.send(true);
      } else {
        res.send(false);
      }
    }
  });
});

//runs the signup function with info provided from an object from client
//sends back OK on success
app.post('/signup', (req, res) => {
  signup(
    { username: req.body.username, password: req.body.password, birthday: req.body.birthday},
    (err, response) => {
      if (err) console.log(err);
      else {
        var sess = {
          username: req.body.username,
          login: true
        };
        req.session.userData = sess;
        res.send();
      }
    }
  );
});

app.get('/logout', (req, res) => {
  delete req.session.userData;
  res.send();
});

app.get('/youtube', (req, res) => {
  var container = {};
  var imdb_id;

  // req.query.search will be the movie ID passed
  // This ID must be used to find the IMDB ID in Movie DB
  // The IMDB ID will be used to find the movie trailers

  axios
    .get(
      `https://api.themoviedb.org/3/movie/${
        req.query.search
      }?api_key=${API_KEY}`
    )
    .then(response => {
      imdb_id = response.data.imdb_id;
    })
    .catch(err => {
      console.error('Error retrieving movie ID from Movie DB', err);
    })
    .then(() => {
      imdb
        .get({ id: imdb_id }, { apiKey: imdb_key })
        .then(response => {
          container.imdb = response;

          axios
            .get(
              `https://api.themoviedb.org/3/movie/${
                req.query.search
              }/videos?api_key=${API_KEY}`
            )
            .then(data => {
              container.trailer = data.data.results;
            })
            .catch(err => {
              console.error('Error fetching trailer from Movie DB', err);
            })
            .then(() => {
              res.send(container);
            });
        })
        .catch(err => {
          console.error('Error fetching from IMDB', err);
        });
    });
});

app.delete('/:user/:movie', function(req, res) {
  deleteMovie(req.params.movie, req.params.user, err => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send();
    }
  });
});
app.get('/nowPlaying', (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=US`
    )
    .then(response => {
      res.send(response.data.results);
    })
    .catch(err => {
      console.error('Error fetching movies now playing', err);
    });
});

app.get('/session', (req, res) => {
  if (req.session.userData) {
    res.send(req.session.userData);
  }
});

//this route is used to handle the refresh button of the browser. With React Router front end,
//this is necessary to enable refreshing of the page
app.get('/*', (req, res) => {
  res.redirect('/');
});

//*******server startup********
let port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening in on port: ', port));
