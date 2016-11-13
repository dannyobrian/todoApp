var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var configuration = require('./webpack.config');

module.exports = {
  context: configuration.context,
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  devServer: {
    host: 'localhost',
    port: 5000,
    contentBase: 'static/',
    hot: true,
    colors: true,
    inline: true,
    compress: true, // Set this if you want to enable gzip compression for assets.
    historyApiFallback: true, // Set this as true if you want to access dev server from arbitrary url.
  },
  output: {
    //path: path.join(__dirname, 'dist'),
    path: '/static',
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/static/images', to: 'images' }
    ])
  ],
  module: {
    //loaders: configuration.module.loaders
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
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
	      test: /\.less$/,
	      loaders: ['style', 'css', 'postcss', 'less-loader']
	      //loader: 'style-loader!css!less-loader'
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
    extensions: configuration.resolve.extensions
  },
  test: function (config) {
    return {
      entry: 'webpack.tests.js',
      output: _.assign({}, config.output, {
        // client assets are output to dist/test/
        path: path.join(config.output.path, 'test'),
        publicPath: undefined // no assets CDN
      }),
      devtool: 'inline-source-map', // sourcemap support
      plugins: config.plugins.concat(
        new webpack.DefinePlugin({
          'typeof window': JSON.stringify("object")
        })
      )
    };
  },
}
