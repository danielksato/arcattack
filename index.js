'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const db = require('./app/db');
const processMidi = require('./app/processMidi');

const app = express();
const compiler = webpack(config);

app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('.'));

app.listen(process.env.PORT || 3000);
