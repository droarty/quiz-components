// The research doc that culminated in this configuration is here:
// https://docs.google.com/document/d/1RNL1phoJDsG-2yYgTyEh4HIZdvRev0xW0WXELNKhHlM/edit#
var path = require('path');
var webpack = require('webpack')

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ], //run in Chrome, PhantomJS, or customize a phantomjs launcher
    singleRun: true,
    frameworks: [
      'chai-sinon',
      'mocha'
    ],
    files: [
      'spec/tests.jsx'
    ],
    preprocessors: {
      'spec/tests.jsx': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ], //can be mocha (verbose), dots, or progress (least verbose, no dots)
    webpackMiddleware: {
      noInfo: true
    },
    port: 9876,
    colors: true,
    autoWatch: true,

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        root: path.resolve('.')
      },
      module: {
        loaders: require('./config/webpack_loaders.js')
      },
      plugins: [
        // The skin-deep module works with both React v0.13 and v0.14.  This next line will tell
        // webpack to ignore calls requiring v0.13 specific modules that don't exist in v0.14
        // so that it doesn't throw errors in the console.
        new webpack.IgnorePlugin(/ReactContext|react\/addons/)
      ]
    },
    plugins: [
        'karma-chai-sinon',
        'karma-webpack',
        'karma-mocha',
        'karma-chrome-launcher',
        'karma-sourcemap-loader',
        'karma-phantomjs-launcher',
        'karma-mocha-reporter'
    ]

  });
};
