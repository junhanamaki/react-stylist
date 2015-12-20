var path = require('path');

module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
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
      loader: "style-loader!css-loader"
    }]
  },
  eslint: {
    configFile: path.resolve(__dirname, '.eslintrc')
  }
};