var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'gegeu',
  password : '123',
  database : 'node'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Conectado ao BD!");
});

module.exports = conn;
//alterar nome do arquivo para connection.js