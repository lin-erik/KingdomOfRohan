
let moodSearch = require('./../db/index').moodSearch

module.exports.filterResults = (results) => {
  return results.map((result) => {
    let { id, original_title, poster_path, overview, release_date } = result;
    release_date = release_date.slice(0, 4);
    
    return {
      id,
      original_title,
      poster_path,
      overview,
      release_date
    };
  });
};

module.exports.filterRecs = (history, resSend) => {
  //do the special sauce here to filter out their recs


      var watchedMovies = history;
      var currentMovie = history.slice(0).pop();
      var moodArr = []
      for (var i = 0; i < currentMovie.moods.length; i++){
        moodArr.push (currentMovie.moods[i])
      }
      moodSearch(moodArr, function (queriedMovies) {
        for (var j = 0; j < watchedMovies; j++) {
          var watchedMovie = watchedMovies[j];
          queuedMovies = queuedMovies.filter(movie => movie.movieId !== watchedMovie.movieId);
        }
        resSend(queriedMovies);
      })

  
  //return an array of movies as the final recs
}