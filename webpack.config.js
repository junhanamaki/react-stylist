var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var PRODUCTION = process.env.NODE_ENV === 'production';
var DEV_SERVER = JSON.parse(process.env.DEV_SERVER || '0');

module.exports = {
  entry: DEV_SERVER ? './example/index.js' : './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: PRODUCTION ? 'react-stylist.min.js' : 'react-stylist.js'
  },
  module: {
    preLoaders: [
      { loader: 'eslint', test: /\.(js|jsx)$/, exclude: /node_modules/ }
    ],
    loaders: [
      { loader: 'babel', test: /\.(js|jsx)$/, exclude: /node_modules/ },
      { loader: 'style!css', test: /\.css$/, include: /example/, exclude: /node_modules/ },
      { test: /\.css$/, include: /src/, exclude: /node_modules/,
      loader: DEV_SERVER
        ? 'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]'
        : ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]')
    }]
  },
  plugins: PRODUCTION
    ? [
        new ExtractTextPlugin('react-stylist.min.css'),
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
      ]
    : [new ExtractTextPlugin('react-stylist.css')]
};