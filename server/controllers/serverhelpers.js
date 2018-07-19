

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

module.exports.filterRecs = (movies) => {
  //do the special sauce here to filter out their recs



  //return an array of movies as the final recs
}