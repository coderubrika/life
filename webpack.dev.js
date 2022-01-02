/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('config')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: './dist',
    port: config.get('server.port')
  }
});
