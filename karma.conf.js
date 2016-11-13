// Karma configuration
// Generated on Fri Oct 28 2016 10:53:49 GMT+0100 (BST)

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'webpack.tests.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // Run this through webpack, and enable inline sourcemaps
      'webpack.tests.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'inline-source-map',

      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("styles.css"),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false
          },
          compress: {
            warnings: false,
            screw_ie8: true
          }
        }),
        new CopyWebpackPlugin([
          { from: 'src/static/images', to: 'images' }
        ])
      ],

      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: __dirname,
            query: {
              presets: [ 'react-hmre', 'react', 'es2015' ]
            }
          },
          {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
          },
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
          },
          { //url will convert all images below to inline below 8192k otherwise use the img loader
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
              'url?limit=8192',
              'img?name=images/[name].[ext]'
            ]
          },
          {
            test: /\.html$/,
            loaders: ['html-loader']
          },
          {
            test: /\.rt/,
            loader: "react-templates-loader"
          },
          {   //send the files directly
            test: /\.woff$|\.woff2$|\.ttf$|\.eot$|\.wav$|\.mp3$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    client: {
      // log console output in our test console
      captureConsole: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],

    webpackMiddleware: {
      noInfo: true
    },

    // Webpack takes a little while to compile -- this manifests as a really
    // long load time while webpack blocks on serving the request.
    browserNoActivityTimeout: 60000, // 60 seconds

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
