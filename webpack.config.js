//var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
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
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        include: path.resolve(__dirname, 'src'),
        loader: "ts-loader"
        /*
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
        */
      }
    ]
  },
  plugins: [
    //new ForkTsCheckerWebpackPlugin()
  ],
  //target: 'node',
  externals: [nodeExternals()],
};
