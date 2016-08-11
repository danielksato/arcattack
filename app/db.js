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
    filename: 'varchar(255)',
    owner: 'int',
    originalname: 'varchar(255)',
    playcount: 'int default 0'
  }
};

createDB(schema, db);

module.exports = {

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
  },

  getSongs (req, cb) {
    db.all('SELECT * FROM SONGS', (err, res) => {
      if (err) return console.log(err);
      if (res) cb(res);
    })
  },

  addSong (req, cb) {
    db.get('SELECT * FROM SONGS WHERE FILENAME LIKE ?', [req.filename], (err, res) => {
      if (err) return console.log(err);
      if (res) return cb(null);
      db.run(
        'INSERT INTO SONGS (filename, originalname, owner) VALUES (?,?,?)',
        [req.file.filename, req.file.originalname, 1],
        (err, res) => {
          if (err) return console.log(err);
          db.get('SELECT * FROM SONGS WHERE FILENAME LIKE ?', [req.file.filename], (err, res) => {
            if (err) return console.log(err);
            cb(res);
          });
        }
      );
    });
  }

};
