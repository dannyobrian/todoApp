var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const es3ifyPlugin = require('es3ify-webpack-plugin');

// project folder
var root_folder = path.resolve(__dirname, '.')

module.exports = {
  devtool: 'cheap-module-source-map',
  content: root_folder,
  entry: [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new es3ifyPlugin(),
  ],
  module: {
    loaders: configuration.module.loaders
  },
  resolve: {
    extensions: configuration.resolve.extensions
  },
}
