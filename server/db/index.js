var MongoClient = require('mongodb').MongoClient

var state = {
  db: null,
}

exports.connect = async function(url, done) {
  try {
    if (state.db) return done();  
    console.log('conectting', url);
    const client = await MongoClient.connect(url, {  useNewUrlParser: true  });    
    state.db = client.db('master-build');
    return { hasError: false };
  } catch (error) {

    return { ...error, hasError: true };
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