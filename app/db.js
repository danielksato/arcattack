'use strict'
const sqlite3 = require('sqlite3');
const path = require('path');

const db = new sqlite3.Database(path.join(
  __dirname,
  '../db/creepster.sqlite'), (err) => {
  err && console.log(err);
});

module.exports = {

  doSomething () {}
  
};
