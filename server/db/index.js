const mongoose = require('mongoose')
let db = require('./models/index').db
let User = require('./models/index').User
let Movie = require('./models/index').Movie

let authenticate = (username, cb) => {
    User.findOne({username: username}, `password`, (err, docs) => {
        if (err) cb(err)
        else cb(null, docs)
    })
}

let signup = (info, cb) => {
    let user = new User({
        username: info.username,
        password: info.password,
        history: [null]
    });
    user.save();
    cb(null) 
}
//Basic moodSearch query that takes a set of moods,
//queries the Movie database for the moods passed
//in the moodArr and then passes the result into
//the passed in callback cb
let moodSearch = (moodArr, cb) => {
  console.log ('moodArr: ', moodArr);
  Movie
  .where(moodArr[0]).ne(undefined)
  .then(function (response) {
    console.log ('Response: ', response.slice (0,4));
    cb (null, response.slice(0, 4));
  })
  .catch (function (err) {
    console.log (err);
    cb (err, null);
  })
}
let save = (info, cb) => {
    // delete info.current_user;
    Movie.findOne({title: info.original_title}, (err, docs) => {
        if (err) console.log('error retrieving movie', err)
        else {
            if (docs === null) {
                newMovie(info, (err) => {
                    if (err) cb(err)
                    else {
                        cb(null)
                    }
                })
            } else {
                updateMovie(docs, info, (err) => {
                    if (err) cb(err)
                    else (cb(null))
                })
            }
        }
    })
}

let newMovie = (info, cb) => {
    console.log('we saving a new movie!')
    let spec = {};
    info.moods.forEach((mood) => {
        spec[mood] = 1
    })
    spec.original_title = info.original_title;
    spec.poster_path = info.poster_path;
    spec.id = info.id;
    spec.overview = info.overview;
    spec.release_date = JSON.parse(info.release_date);
    let movie = new Movie(spec)
    movie.save();
    cb(null)
}

let updateMovie = (docs, info, cb) => {
    info.moods.forEach((mood) => {
        if (docs[mood]) {
            docs[mood]++
        }
        else docs[mood] = 1
    });
    // console.log('after the forEach: ', docs)
    Movie.findOneAndUpdate({id: docs.id}, docs, {upsert: true}, (err, document) => {
        if (err) cb(err)
        else cb(null)
    })
}

let histSave = (info, cb) => {
    console.log('in the db, saving to user history for user ', info.current_user);
    User.findOne({username: info.current_user}, (err, docs) => {
        if (err) cb(err)
        else {
            console.log('inside hist save, here are the docs for that user: ', docs)
            let newHist = [];
            docs.history.forEach((hist) => newHist.push(hist))
            newHist.push(info)
           if (newHist[0] === null) newHist = newHist.slice(1)
            User.findOneAndUpdate({username: docs.username}, {history: newHist}, (err, response) => {
                if (err) cb(err)
                else cb(null) 
            })
        }
    })
}

let fetchHist = async (un) => {
    let data = await User.findOne({username: un})
    return data.history
}

module.exports.authenticate = authenticate
module.exports.signup = signup
module.exports.save = save
module.exports.histSave = histSave
module.exports.fetchHist = fetchHist
module.exports.moodSearch = moodSearch