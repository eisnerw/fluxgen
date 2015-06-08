var webpack = require('webpack');
RewirePlugin = require('rewire-webpack');

module.exports = function (config) {
   config.set({
      basePath: '',
      frameworks: ['mocha', 'sinon-chai'],
      files: [
         'tests.webpack.js' 
      ],
      browsers: [ 'Chrome' ], 
      
      preprocessors: {
         'tests.webpack.js': [ 'webpack', 'sourcemap' ] 
      },
      reporters: [ 'dots' ], 
      colors: true,
      autoWatch: true,
      singleRun: false, 

      logLevel: config.LOG_INFO,
      webpack: { 
         devtool: 'inline-source-map', 
         module: {
            loaders: [
               { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
               { test: /\.jsx$/, loader: 'babel-loader?stage=0', exclude: /node_modules/ },
            ]
         },
         plugins: [
            new RewirePlugin()
         ]
      },
      
      webpackServer: {
         noInfo: true 
      },
      browserNoActivityTimeout: 100000
   });
};