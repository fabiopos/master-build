var MongoClient = require('mongodb').MongoClient

var state = {
  db: null,
}

exports.connect = async function(url, done) {
  try {
    if (state.db) return done();  
    const client = await MongoClient.connect(url, {  useNewUrlParser: true  });
    state.db = client.db('master-build')
    
  } catch (error) {
    return error;
  }

}


exports.get = function() {
  return state.db;
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}