var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'lucas',
  password : 'Lu@123lucas',
  database : 'node'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Conectado ao BD!");
});

module.exports = conn;