'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require ('cors');
const db = require('./app/db');
const upload = require('multer')({dest: './uploads'});

const app = express();

function dbResponse (val, res) {
  if (!val) {
    res.status(403);
    res.send();
  } else res.json(val);
}
// app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

app.put('/login', (req, res) => {
  db.login(req.body, (val) => dbResponse(val, res));
});

app.put('/register', (req, res) => {
  db.register(req.body, (val) => {
    if (!val) {
      res.status(403);
      res.send();
    } else res.json(val);
  });
});

app.post('/upload', upload.single('file'), (req, res) => {
  db.addSong(req, (val) => dbResponse(val, res));
});

app.get('/fileList', (req, res) => {
  db.getSongs(req, (val) => dbResponse(val, res));
});

app.listen(3001);
