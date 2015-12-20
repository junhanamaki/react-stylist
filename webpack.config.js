var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var MINIFIED = JSON.parse(process.env.MINIFIED || '0');

module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: MINIFIED ? 'react-stylist.min.js' : 'react-stylist.js'
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      query: { presets: ['es2015', 'stage-0', 'react'] }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]')
    }]
  },
  plugins: MINIFIED
    ? [
        new ExtractTextPlugin("react-stylist.min.css"),
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
      ]
    : [new ExtractTextPlugin("react-stylist.css")],
  eslint: {
    configFile: path.resolve(__dirname, '.eslintrc')
  }
};