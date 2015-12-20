var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-stylist.js'
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
  plugins: [
    new ExtractTextPlugin("react-stylist.css")
  ],
  eslint: {
    configFile: path.resolve(__dirname, '.eslintrc')
  }
};