var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('../server/db/models/index.js').User;

describe('Model', function () {
  it('Dont save incorrect format to database', function(done) {
    //Attempt to save with wrong info. An error should trigger
    var wrongSave = User({});

    wrongSave.save()
      .then(()=> console.log('test failed'))
      .catch(() => done());
  });
  it('Should retrieve data from test database', function(done) {
    var saveUser = User({
      username: 'JonI69',
      password: 'hey'
    }).save()
      .then(response => {
        User.find({username: 'JonI69'}, (err, name) => {
          if(err) {throw err;}
          if(name.length === 0) {throw new Error('No data!');}
          done();
        });
      })
  });
});
