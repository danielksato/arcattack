'use strict'
const path = require('path');

module.exports = {
  entry: __dirname+'/client/app.jsx',
  output: {
    path: __dirname,
    file: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        query: {
          presets: ['react','es2015']
        }
      }
    ]
  }
};
