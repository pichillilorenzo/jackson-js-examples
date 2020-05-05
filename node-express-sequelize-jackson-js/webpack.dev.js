const webpack = require('webpack');
const path = require('path');

const defaultConfig = {
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/, /tests/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  mode: 'development',
  plugins: []
};

const serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  },
  externals: [
    'pg',
    { 'sqlite3':'commonjs sqlite3', },
    'tedious',
    'pg-hstore'
  ],
  ...defaultConfig
};

module.exports = [ serverConfig ];
