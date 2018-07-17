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
    Movie.findOne({movieName: info.title} `movieName`, (err, docs) => {
        if (err) console.log(err)
        else {
            if (docs === undefined) {
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
    let spec = {};
    info.moods.forEach((mood) => {
        spec[mood] = 1
    })
    spec.title = info.title;
    spec.poster_path = info.poster_path;
    spec.release_date = info.release_date;
    let movie = new Movie(spec)
    movie.save();
    cb(null)
}

let updateMovie = (docs, info, cb) => {
    info.moods.forEach((mood) => {
        if (docs[mood]) docs[mood]++
        else docs[mood] = 1
    });
    Movie.findByIdAndUpdate({title: docs.title}, {docs}, {upsert: true}, (err) => {
        if (err) cb(err)
        else cb(null)
    })
}

module.exports.authenticate = authenticate
module.exports.signup = signup
module.exports.save = save