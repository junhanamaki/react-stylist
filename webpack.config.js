var path = require('path');

module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [{
      loader: 'eslint-loader',
      test: /\.(js|jsx)$/
    }],
    loaders: [{
      loader: 'babel-loader',
      test: /\.(js|jsx)$/,
      query: { presets: ['es2015', 'stage-0', 'react'] }
    }]
  },
  eslint: {
    configFile: path.resolve(__dirname, '.eslintrc')
  }
};