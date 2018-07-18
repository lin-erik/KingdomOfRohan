const express = require('express');
let app = express();
const parser = require('body-parser');
const axios = require('axios');
let db = require('./../db/connection').connection
let authenticate = require('./../db/index').authenticate
let signup = require('./../db/index').signup
let save = require('./../db/index').save
let { API_KEY } = require('../../config.js')

//********middleware and plugins*********
app.use(parser.json());
app.use(express.static(__dirname + '/../../dist'));

//*******GET/POST section*******

//profile search - example url: localhost:8080/search/?input=batman+begins
app.get('/search', (req, res) => {
  let movie = req.query.title
  console.log('movie: ', movie)
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${ API_KEY }&language=en-US&page=1&include_adult=false&query=${movie}`)
    .then((response) => {
      console.log('server repsonse: ', typeof response.data.results, response.data.results.length);
      res.status(200).send(response.data.results);
    })
    .catch((err) => console.log(err))
  

  //search the API here for a movie response
  //then send back single movie response to front end axios call
  
  
});

//profile save with tags
app.post('/save', (req, res) => {
  //access the data that needs to be posted to db like this
  console.log(req.body);

  //save data to both the global movie table
  save(req.body, (err) => {
    if (err) console.error(err)
    else {
      //AND the users individual history
      res.status(200).send(req.body);
    }
  })

  //placeholder for testing
});

//*******Global Querying by Mood*******

//mood search - example url: localhost:8080/results/?moods=happy+sad+cool
app.get('/results/:moods?', (req, res) => {
  //creating an array with each mood that was sent with query
  var moods = req.query.moods.split(' ');
  console.log(moods);

  res.status(200).send('received your query');
});

//*****Single User Functionality ******/

//get history for dynamic username parameter
//example url: localhost:8080/users/history/?username=parker
app.get('/users/history/:username?', (req, res) => {
  //this is how you grab the username from the url
  console.log(req.query.username);

  res.status(200).send(req.query);
});

//*******Authentication section*******
app.post('/login', (req, res) => {
  let username = req.body.username;
  authenticate(username, (err, data) => {
    if (err) console.error(err)
    else {
      let allowedAccess = false
      if (Object.keys(data).length > 1 && data.password === req.body.password) {
        allowedAccess = true
      }
      res.send(allowedAccess)
    }
  })
})

app.post('/signup', (req, res) => {
  signup({username: req.body.username, password: req.body.password}, (err, response) => {
    if (err) console.log(err)
    else {
      res.send()
    }
  })
})


//*******server startup********
let port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening in on port: ', port));