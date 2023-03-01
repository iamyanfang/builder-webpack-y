const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const autoprefixer = require('autoprefixer');

//运行时的目录 ，运行测试的时候，目录时在test/smoke/template下，注意目录的改变！！！
// 用来替换__dirname
const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackplugins = [];
  // 获取入口文件  需要处理windows下文件分隔符是\的问题
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'), {windowsPathsNoEscape: true});

  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];
      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1]; // 匹配括号里面的内容
      entry[pageName] = entryFile;

      return htmlWebpackplugins.push(
        new HtmlWebpackplugin({
          template: path.join(projectRoot, `./src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['vendors', 'commons', pageName], // 指定
          inject: true, // 打包的css，js会自动注入到html中
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
        }),
      )
    });

  return {
    entry,
    htmlWebpackplugins,
  };
};
const { entry, htmlWebpackplugins } = setMPA();

console.log(entry);
module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, './dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  // 资源解析
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 将css提取为单独的文件
          'css-loader',
        ],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                ],
              },

            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 1rem = 75px
              rePrecesion: 8, // px转成rem的小数位数
            },
          },
        ],
      },
      {
        test: /.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      { test: /.(woff|wofff2|eot|ttf|otf)$/, use: 'file-loader' },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    ...htmlWebpackplugins,
    new FriendlyErrorsWebpackPlugin(),
    function doneErrorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors?.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error !!');  //eslint-disable-line
          process.exit(1);
        }
      });
    },
  ],
  stats: 'errors-only',
};
