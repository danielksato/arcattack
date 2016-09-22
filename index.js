'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require ('cors');
const db = require('./app/db');
const upload = require('multer')({dest: './uploads'});
const shuffle = require('lodash').shuffle;

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
  db.getSongs(req, (val) => {
    dbResponse({port: sockets.httpListener.address().port, list: val}, res);
  });
});

const sockets = require('./app/sockets')(app);

setInterval(() => {
  const port = sockets.httpListener.address().port;

  db.getSongs(null, (val) => {
    Object.keys(sockets.sockets).forEach((socket) => {
      sockets.sockets[socket].send(JSON.stringify({port, list: shuffle(val)}));
    });
  });
}, 3000)
