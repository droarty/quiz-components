// jest/preprocessor.js
var babelJest = require('babel-jest');
var webpackAlias = require('jest-webpack-alias');

module.exports = {
  process: function(src, filename) {
    // avoids mocking css files
    if (filename.match(/\.[css|less|scss]/)) {
      return '';
    }
    if (filename.indexOf('node_modules') === -1) {
      src = babelJest.process(src, filename);
      src = webpackAlias.process(src, filename);
    }
    return src;
  }
};