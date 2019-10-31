const { Pool } = require('pg');

dt = {
  host : "localhost",
  port: 5432,
  db : "dev",
  user: "postgres",
  pass: "zenzen_0014"
}

//var cs = "postgres://*USERNAME*:*PASSWORD*@*HOST*:*PORT*/*DATABASE*"
var cs = "postgres://"+dt.user+":"+dt.pass+"@"+dt.host+":"+dt.port+"/"+dt.db


const pool = new Pool({
  connectionString: cs
});

module.exports = pool;

