const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = {
  entry: {
    application: ['./client/index.js'],
    vendor: ["react","react-dom","react-router","redux","redux-thunk", "isomorphic-fetch", "babel-polyfill", "es6-promise", "es5-shim", "console-polyfill"]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new Es3ifyPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
        beautify: {
          quote_keys:true
        }
      },
      compress: {
        warnings: false,
        screw_ie8: false
      }
    }),
    new CopyWebpackPlugin([
      { from: 'src/static/images', to: 'images' },
      { from: 'src/static/lib', to: 'lib' }
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          presets: ["es2015", "react", "stage-2", "es3"],
          plugins: [
            ["transform-es2015-modules-commonjs", { "loose": true }],
            ["transform-es3-property-literals"],
            ["transform-es3-member-expression-literals"],
            ["transform-es3-modules-literals"]
          ]
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: /\/node_modules\//,
        loader: 'es3ify'
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
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx', '.scss', '.less']
  },
};
