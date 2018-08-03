const mongoose = require('mongoose');
let db = require('./models/index').db;
let User = require('./models/index').User;
let Movie = require('./models/index').Movie;
let Purchased = require('./models/index').Purchased;

//Queries db by username, fetches their password field, and hands off
let authenticate = (username, cb) => {
  User.findOne({ username: username }, `password`, (err, docs) => {
    if (err) cb(err);
    else cb(null, docs);
  });
};

//creates a new user in the User table, hands off
let signup = (info, cb) => {
  let user = new User({
    username: info.username,
    password: info.password,
    birthday: info.birthday,
    history: [null]
  });
  user.save();
  cb(null);
};
//Basic moodSearch query that takes a set of moods,
//queries the Movie database for the moods passed
//in the moodArr and then passes the result into
//the passed in callback cb
let moodSearch = (moodArr, cb) => {
  if (!moodArr[1]) {
    moodArr[1] = moodArr[0];
  }
  if (!moodArr[2]) {
    moodArr[2] = moodArr[1];
  }
  Movie.where(moodArr[0])
    .ne(undefined)
    .sort(`-${moodArr[0]}`)
    .where(moodArr[1])
    .ne(undefined)
    .where(moodArr[2])
    .ne(undefined)
    .then(function(response) {
      console.log('Response: ', response);
      cb(null, response);
    });
  //  .catch (function (err) {
  //    console.log (err);
  //  }).where (moodArr[1]).ne(undefined)
  //  .then(function (response) {
  //    console.log (response.slice (0,4));
  //    if (moodArr[2]) {
  //      return response;
  //    }
  //    cb (response.slice(0, 4));
  //  })
};

//Queries GlobalMovies db by title (info is object passed from server)
//If null (movie not in database), runs newMovie function
//If not null (movie is in database), runs updateMovie function
//either way, hands off
let save = (info, cb) => {
  Movie.findOne({ original_title: info.original_title }, (err, docs) => {
    if (err) console.log('error retrieving movie', err);
    else {
      if (docs === null) {
        newMovie(info, err => {
          if (err) cb(err);
          else {
            cb(null);
          }
        });
      } else {
        updateMovie(docs, info, err => {
          if (err) cb(err);
          else cb(null);
        });
      }
    }
  });
};

let savePurchase = (info, cb) => {
  let spec = {};

  spec.original_title = info.original_title;
  spec.poster_path = info.poster_path;
  spec.id = info.id;
  spec.overview = info.overview;
  spec.release_date = info.release_date;
  spec.trailer = info.purchase_trailer;

  let purchase = new Purchased(spec);
  purchase.save();
  cb(null);
};

//takes in a movie object, and creates a blank object, 'spec'
//attach each mood from movie object to the spec
//then adds the other movie info to it
//finally, saves this as a new Movie, and hands off
let newMovie = (info, cb) => {
  let spec = {};
  info.moods.forEach(mood => {
    spec[mood] = 1;
  });
  spec.original_title = info.original_title;
  spec.poster_path = info.poster_path;
  spec.id = info.id;
  spec.overview = info.overview;
  spec.release_date = JSON.parse(info.release_date);
  spec.review_count = 1;
  let movie = new Movie(spec);
  movie.save();
  cb(null);
};

//takes in docs (from parent function query) and a movie object (passed from server).
//goes thru the moods array on the movie object, plussing their value on the docs
//or setting to 1 (meaning this movie has not been tagged with that mood before).
//finally, updates that movie's fields, and hands off
let updateMovie = (docs, info, cb) => {
  info.moods.forEach(mood => {
    if (docs[mood]) {
      docs[mood]++;
    } else docs[mood] = 1;
  });
  docs.review_count++;
  Movie.findOneAndUpdate(
    { id: docs.id },
    docs,
    { upsert: true },
    (err, document) => {
      if (err) cb(err);
      else cb(null, document);
    }
  );
};

//takes in a movie object with username (passed from server) and queries db
//pushes old history into new array. lops off null if present
//updates the user's history array, and hands off
let histSave = (info, cb) => {
  User.findOne({ username: info.current_user }, (err, docs) => {
    if (err) cb(err);
    else {
      let newHist = [];
      let dupeFound = false;
      docs.history.forEach(hist => {
        if (hist !== null) {
          if (hist.original_title !== info.original_title) {
            newHist.push(hist);
          } else {
            info.moods.forEach(mood => {
              if (!hist.moods.includes(mood)) hist.moods.push(mood);
            });
            newHist.push(hist);
            dupeFound = true;
          }
        }
      });
      if (!dupeFound) {
        newHist.push(info);
      }
      if (newHist[0] === null) newHist = newHist.slice(1);
      User.findOneAndUpdate(
        { username: docs.username },
        { history: newHist },
        (err, response) => {
          if (err) cb(err);
          else cb(null);
        }
      );
    }
  });
};

let purchaseSave = (info, cb) => {
  User.findOne({ username: info.current_user }, (err, docs) => {
    if (err) cb(err);
    else {
      let newPurchased = [];
      let dupeFound = false;
      docs.purchased.forEach(purchase => {
        if (purchase !== null) {
          if (purchase.original_title !== info.original_title) {
            newPurchased.push(purchase);
          } else {
            newPurchased.push(purchase);
            dupeFound = true;
          }
        }
      });
      if (!dupeFound) {
        newPurchased.push(info);
      }
      if (newPurchased[0] === null) newPurchased = newPurchased.slice(1);
      User.findOneAndUpdate(
        { username: docs.username },
        { purchased: newPurchased },
        (err, response) => {
          if (err) cb(err);
          else cb(null);
        }
      );
    }
  });
};

let fetchPurchases = async un => {
  let data = await User.findOne({ username: un });
  return data.purchased;
};

//takes in a username (passed from server) and quries the db
//hands back the history array from the received docs
let fetchHist = async un => {
  let data = await User.findOne({ username: un });
  return data.history;
};

let giveRecommendations = (movieId, callback) => {
  fetchHistoriesWithMovie(movieId, (err, histories) => {
    if (err) {
      callback(err);
    } else {
      let occurences = {};
      for (let i = 0; i < histories.length; i++) {
        for (let j = 0; j < histories[i].length; j++) {
          if (histories[i][j]) {
            if (histories[i][j].id != movieId) {
              if (occurences[histories[i][j].id]) {
                occurences[histories[i][j].id][1]++;
              } else {
                occurences[histories[i][j].id] = [histories[i][j], 1];
              }
            }
          }
        }
      }

      let movieTouples = Object.values(occurences);
      movieTouples.sort(function(a, b) {
        return b[1] - a[1];
      });

      let sortedRecommendations = movieTouples.map(movieTouple => {
        return movieTouple[0];
      });
      callback(null, sortedRecommendations);
    }
  });
};

let fetchHistoriesWithMovie = (movieId, callback) => {
  fetchAllUsers((err, users) => {
    if (err) {
      callback(err);
    } else {
      let historiesWithMovie = [];
      for (let j = 0; j < users.length; j++) {
        for (let i = 0; i < users[j].history.length; i++) {
          if (users[j].history[i]) {
            if (users[j].history[i].id == movieId) {
              historiesWithMovie.push(users[j].history);
            }
          }
        }
      }
      callback(null, historiesWithMovie);
    }
  });
};

//Fetches all histories from all users from database
let fetchAllUsers = callback => {
  User.find({}, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

let deleteMovie = (movie, user, callback) => {
  removeMovieFromHistory(movie, user, (err, moodsToDelete) => {
    if (err) {
      callback(err);
    } else {
      removeMoodsFromMovie(movie, moodsToDelete, err => {
        if (err) {
          callback(err);
        } else {
          callback();
        }
      });
    }
  });
};

let removeMovieFromHistory = (movie, user, callback) => {
  User.findOne({ username: user }, (err, foundUser) => {
    if (err) {
      callback(err);
    } else {
      let oldHist = foundUser.history;
      let oldMovieMoods;
      let newHist = [];
      for (let i = 0; i < oldHist.length; i++) {
        if (oldHist[i].id == movie) {
          oldMovieMoods = oldHist[i].moods;
        } else {
          newHist.push(oldHist[i]);
        }
      }
      foundUser.history = newHist;
      User.findOneAndUpdate({ username: user }, foundUser, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, oldMovieMoods);
        }
      });
    }
  });
};

let removeMoodsFromMovie = (movie, moods, callback) => {
  Movie.findOne({ id: movie }, (err, oldMovie) => {
    if (err) {
      callback(err);
    } else {
      for (let i = 0; i < moods.length; i++) {
        oldMovie[moods[i]]--;
      }
      Movie.findOneAndUpdate({ id: movie }, oldMovie, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback();
        }
      });
    }
  });
};

// Finds a movie based on its id
let findMovieById = (id, cb) => {
  Movie.findOne({ id: id }, (err, movie) => {
    if (movie === null) {
      cb('no movie found', null);
    } else {
      cb(null, movie);
    }
  });
};

// Finds a user by username, and returns all info besides password
let getUserByName = (username, cb) => {
  User.findOne({ username: username })
    .select('-password')
    .exec((err, user) => {
      if (err) {
        cb(err);
      } else {
        cb(null, user);
      }
    });
};

// Sets a user's theme to the given theme
let setUserTheme = (username, theme, cb) => {
  User.updateOne(
    { username: username },
    { theme: theme },
    { upsert: true },
    (err, user) => {
      if (err) {
        cb(err);
      } else {
        cb(null, user);
      }
    }
  );
};

let isOver18 = (birthday, cb) => {
  let birthdayArray = birthday.split('-');
  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth() + 1;
  let currentDay = date.getDate();

  if (currentYear - Number(birthdayArray[0]) > 18) {
    return cb(null, true);
  }
  if (currentYear - Number(birthdayArray[0]) === 18) {
    if (currentMonth - Number(birthdayArray[1]) > 0) {
      return cb(null, true);
    }
    if (
      currentMonth - Number(birthdayArray[1]) === 0 &&
      currentDay - birthdayArray[2] >= 0
    ) {
      return cb(null, true);
    }
  }
  return cb(null, false);
};

module.exports = {
  authenticate,
  signup,
  save,
  histSave,
  fetchHist,
  moodSearch,
  giveRecommendations,
  deleteMovie,
  findMovieById,
  getUserByName,
  setUserTheme,
  isOver18,
  purchaseSave,
  fetchPurchases,
  savePurchase
};
