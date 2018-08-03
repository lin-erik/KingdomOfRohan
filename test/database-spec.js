var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('../server/db/models/index.js').User;
var Movie = require('../server/db/models/index.js').Movie;
var server = require('../server/controllers/index.js');

chai.use(chaiHttp);

describe('Model', function() {
  it('Dont save incorrect format to database', function(done) {
    //Attempt to save with wrong info. An error should trigger
    var wrongSave = User({});

    wrongSave
      .save()
      .then(() => console.log('test failed'))
      .catch(() => done());
  });
  it('Should retrieve data from test database', function(done) {
    var saveUser = User({
      username: 'JonI69',
      password: 'hey'
    })
      .save()
      .then(response => {
        User.find({ username: 'JonI69' }, (err, name) => {
          if (err) {
            throw err;
          }
          if (name.length === 0) {
            throw new Error('No data!');
          }
          done();
        });
      });
  });
  it('Should properly find a movie', function(done) {
    var saveUser = User({
      username: 'JonI69',
      password: 'hey'
    })
      .save()
      .then(() => {
        chai
          .request(server)
          .get('/search')
          .query({ title: 'batman begins' })
          .then(res => {
            expect(res.body).to.be.a('array');
            expect(res.body[0].original_title).to.eql('Batman Begins');
            done();
          });
      });
  });
  it('Should store movie in the database', function(done) {
    Movie({
  id: 1,
  original_title: '1',
  poster_path: '1',
  release_date: 1,
  overview: '1',
  whimsical: 1,
  intense: 1,
  thriller: 1,
  heartfelt: 1,
  gripping: 1,
  boring: 1,
  "thought provoking": 1,
  uplifting: 1,
  light: 1,
  "tear jerker": 1,
  challenging: 1,
  "mind screw": 1,
  nostalgic: 1,
  powerful: 1,
  despair: 1,
  exhausting: 1,
  paranoid: 1,
  motivated: 1,
  uncomfortable: 1,
  review_count: 1
    }).save()
      .then(function(response) {
        Movie.find({id: 1}, function(err, movie) {
          if(err) {throw err}
          let values = Object.keys(movie);
          for (var i = 0; i < values.length; i++) {
            expect(values[i]).to.exist;
          }
          done();
        });
      })
  });
});
