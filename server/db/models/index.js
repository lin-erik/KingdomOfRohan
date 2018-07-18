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
  title: String,
  poster_path: String,
  release_date: Number,
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
module.exports.db = db
module.exports.User = User
module.exports.Movie = Movie