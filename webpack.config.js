var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  devtool: 'source-map',

  entry: {
    app: './app/main.jsx',
    styles: './styles/styles.less'
  },

  output: {
    path: __dirname + '/public/build',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {test: /\.(eot|ttf|woff)$/, loader: 'file?name=fonts/[name].[ext]'},
      {test: /\.(png|svg)$/, loader: 'url?limit=10000&name=images/[name]-[hash].[ext]&size=6'},
      {
         test: /\.css$/,
         loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
         test: /\.less$/,
         loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    unsafeCache: true
  },
   plugins: [
      new ExtractTextPlugin("[name].css", {
         allChunks: true
      }),
   ]
}

module.exports = config