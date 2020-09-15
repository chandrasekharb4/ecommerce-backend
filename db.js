const mysql = require('mysql2');
  // create the pool
  
  const pool = mysql.createPool({host:'remotemysql.com', user: 'bIiIhknpNM',password:'mfnuhSh60t', database: 'bIiIhknpNM'});
  // now get a Promise wrapped instance of that pool
  const promisePool = pool.promise();
  // query database using promises
  
  module.exports  = promisePool;
