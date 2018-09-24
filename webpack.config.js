var fs = require('fs');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/server.ts',
  output: {
    path: __dirname + '/dist',
    filename: '[name].[chunkhash:8].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        include: path.resolve(__dirname, 'src'),
        loader: "ts-loader"
      }
    ]
  },
  externals: [nodeExternals()],
};
