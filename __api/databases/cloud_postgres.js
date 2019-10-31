const { Pool } = require('pg');

dt = {
  host : "ec2-54-228-252-67.eu-west-1.compute.amazonaws.com",
  port: 5432,
  db : "dd2hnj2adiqnr9",
  user: "cufouwpmmczcgo",
  pass: "e208f1babe84b8a71470a7bd3df91e4eeb311eec42a9b3867d87e05a6ec06648"
}

var cs = "postgres://"+dt.user+":"+dt.pass+"@"+dt.host+":"+dt.port+"/"+dt.db
//var connectionString = "postgres://*USERNAME*:*PASSWORD*@*HOST*:*PORT*/*DATABASE*"

const pool = new Pool({
  connectionString: cs,
  ssl: true
});

module.exports = pool;
