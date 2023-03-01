const { merge } = require('webpack-merge');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
  mode: 'production',
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://now8.gtimg.com/now/lib/16.8.6/react.min.js', // cdn地址
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://now8.gtimg.com/now/lib/16.8.6/react-dom.min.js', // cdn地址
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      // css压缩
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        common: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
