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
        history: {}
    });
    user.save();
    cb(null)
}

let save = (info, cb) => {
    delete info.user;
    Movie.findOne({title: info.title}, (err, docs) => {
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
    spec.title = info.title;
    spec.poster_path = info.poster_path;
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
    Movie.findOneAndUpdate({title: docs.title}, docs, {upsert: true}, (err, document) => {
        if (err) cb(err)
        else cb(null)
    })
}

let histSave = (info, cb) => {
    console.log('in the db, saving to user history');
    User.findOne({username: info.user}, (err, docs) => {
        if (err) cb(err)
        else {
            console.log('finding one by username: ', docs)
            let un = info.user
            delete info.user;
            docs.history[info.id] = info;
            User.findOneAndUpdate({username: un}, docs, (err, response) => {
                if (err) cb(err)
                else{
                    console.log('updated user hist: ', response)
                    cb(null)
                } 
            })
        }
    })
}

module.exports.authenticate = authenticate
module.exports.signup = signup
module.exports.save = save