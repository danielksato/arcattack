'use strict'
const sqlite3 = require('sqlite3');
const path = require('path');
const createDB = require('./lib/createDB');

const db = new sqlite3.Database(path.join(
  __dirname,
  '../db/arcattack.sqlite'), (err) => {
  err && console.log(err);
});

const schema = {
  users: {
    username: 'varchar(255)',
    email: 'varchar(255)',
    password: 'varchar(255)',
    role: 'varchar(255) default "user"'
  },
  songs: {
    owner: 'int',
    filename: 'varchar(255)',
    playcount: 'int default 0'
  }
};

createDB(schema, db);

module.exports = {

  doSomething () {}

};
