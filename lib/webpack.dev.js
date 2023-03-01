const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'developmeng',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: './dist',
  },
  devtool: 'source-map',
  stats: 'errors-only',
};

module.exports = merge(baseConfig, devConfig);
