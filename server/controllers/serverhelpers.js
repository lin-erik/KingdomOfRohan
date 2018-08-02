let moodSearch = require('./../db/index').moodSearch;
let findMovieById = require('./../db/index').findMovieById;

module.exports.filterResults = results => {
  var promiseArr = results.map(result => {
    let { id, original_title, poster_path, overview, release_date } = result;
    release_date = release_date.slice(0, 4);
    return new Promise((resolve, reject) => {
      findMovieById(result.id, (err, res) => {
        if (err === null) {
          resolve(res);
        } else {
          let resultObj = {
            id,
            original_title,
            poster_path,
            overview,
            release_date
          };
          resolve(resultObj);
        }
      });
    });
  });
  return Promise.all(promiseArr);
};

//Unused Method
//Input: an array of the user's viewed movies (history) and the res.send method (resSend) as arguments
//Output: nothing, but calls res.send with a list of movies based on the most recent movie 'mooded' but without any of the movies the user has already seen as the second argument
module.exports.filterRecs = (history, resSend) => {
  //do the special sauce here to filter out their recs
  var watchedMovies = history;
  var currentMovie = history.slice(0).pop();
  var moodArr = [];
  for (var i = 0; i < currentMovie.moods.length; i++) {
    moodArr.push(currentMovie.moods[i]);
  }
  moodSearch(moodArr, function(queriedMovies) {
    for (var j = 0; j < watchedMovies; j++) {
      var watchedMovie = watchedMovies[j];
      queuedMovies = queuedMovies.filter(
        movie => movie.movieId !== watchedMovie.movieId
      );
    }
    console.log(queriedMovies);
    resSend(null, queriedMovies);
  });

  //return an array of movies as the final recs
};
