const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');

const configuration = require('./webpack.config');

module.exports = {
  context: configuration.context,
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:5000',
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  devServer: {
    host: 'localhost',
    port: 5000,
    contentBase: './static',
    hot: true,
    colors: true,
    inline: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: 'http://localhost:5000/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/static/images', to: 'images' }
    ]),
    new Es3ifyPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: ['babel'],
        exclude: /node_modules/,
        include: __dirname,
        query: {
          presets: [ 'react-hmre', 'react', 'es2015', 'stage-2', 'es3' ]
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
	      test: /\.less$/,
	      loaders: ['style', 'css', 'postcss', 'less-loader']
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
      {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ],
  },
  resolve: {
    extensions: configuration.resolve.extensions
  }
};
