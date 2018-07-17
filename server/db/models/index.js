const mongoose = require ('mongoose');

mongoose.connect(`mongodb://KingTheoden:KingTheoden1@ds139921.mlab.com:39921/moodvie-db`)

let db = mongoose.connection;
db.once('open', () => {
   console.log('the database is up and running')
})
/*
mlab login info:
parkermuir
moodvie1
*/
let UserSchema = mongoose.Schema ({
  username: {type: String,
             uniq: true},
  password: String,
  history: Object
})

let MovieSchema = mongoose.Schema ({
  movieName: String,
  posterURL: String,
  whimsical: Number,
	intense: Number,
	thriller: Number,
	heartfelt: Number,
	gripping: Number,
	boring: Number,
	thoughtProvoking: Number,
	uplifting: Number,
	light: Number,
	tearJerker: Number,
	challenging: Number,
	mindScrew: Number,
	nostalgic: Number,
	powerful: Number,
	despair: Number,
	exhausting: Number,
	paranoid: Number,
	motivated: Number,
	uncomfortable: Number
  
})
let User = mongoose.model('User', UserSchema);
let Movie = mongoose.model ('Movie', MovieSchema);
module.exports = {
  
  
  // Posts to the Users Table, as well as creates a new Table named after the username that holds the movies watched by the user and the
  users: {
    post: function (req, res) {
      User.find({username: req.username}, function (err, docs) {
        
      })
      //first query checks to see if the new username is already present in the database;
      
    }
    get: function (req, res) {

    }
  }
}