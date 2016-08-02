'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require ('cors');
const db = require('./app/db');

const app = express();

// app.use(cookieParser());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Method', 'PUT, POST, GET, DELETE');
//   next();
// })
app.use(cors());
app.use(bodyParser.json());

app.put('/login', (req, res) => {
  db.login(req.body, (val) => {
    if (!val) {
      res.status(403);
      res.send();
    } else res.json(val);
  })
});

app.put('/register', (req, res) => {
  db.register(req.body, (val) => {
    if (!val) {
      res.status(403);
      res.send();
    } else res.json(val);
  });
});

app.listen(3001);
