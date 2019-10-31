
const MongoClient = require('mongodb').MongoClient;


dt = {
    host : "mycluster2019-k4hf6.mongodb.net/test?retryWrites=true&w=majority",
    user: "fga_user",
    pass: "fga_1234."
  }


const uri = "mongodb+srv://"+dt.user+":"+dt.pass+"@"+dt.host;

var conn = new MongoClient(uri, { useNewUrlParser: true });

module.exports = conn;


//https://www.thepolyglotdeveloper.com/2018/09/developing-restful-api-nodejs-mongodb-atlas/