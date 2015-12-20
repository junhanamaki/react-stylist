var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var MINIFIED = JSON.parse(process.env.MINIFIED || '0');
var DEV_SERVER = JSON.parse(process.env.DEV_SERVER || '0');

module.exports = {
  entry: DEV_SERVER ? './example/index.js' : './src/index.js',
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
      include: path.resolve(__dirname, 'example'),
      loader: 'style-loader!css-loader'
    }, {
      test: /\.css$/,
      include: path.resolve(__dirname, 'src'),
      loader: DEV_SERVER
        ? 'style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]'
        : ExtractTextPlugin.extract('style-loader', 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]')
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