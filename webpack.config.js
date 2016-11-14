var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

// project folder
var root_folder = path.resolve(__dirname, '.');

module.exports = {
  //devtool: 'inline-source-map',
  devtool: 'cheap-module-source-map',
  //content: root_folder,
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
      { from: 'src/static/images', to: 'images' },
      { from: 'src/static/lib', to: 'lib' }
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
          presets: [ 'react-hmre', 'react', 'es2015', 'stage-2' ]
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
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.less']
  },
};
