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

  doSomething () {},

  login (req, cb) {
    db.get('SELECT * FROM USERS WHERE USERNAME LIKE ?', [req.username], (err, res) => {
      if (err) return console.log(err);
      cb (res || null);
    });
  },

  register (req, cb) {
    db.get('SELECT * FROM USERS WHERE USERNAME LIKE ?', [req.username], (err, res) => {
      if (err) return console.log(err);
      if (res) cb(null);
      !res && db.run(
        'INSERT INTO USERS (username, email, password) VALUES(?,?,?)',
        [req.username, req.email, req.password],
        (err, res) => {
          if (err) return console.log(err);
          db.get('SELECT * FROM USERS WHERE USERNAME LIKE ?', [req.username], (err, res) => {
            !err && cb(res);
          });
        }
      );
    });
  }

};
