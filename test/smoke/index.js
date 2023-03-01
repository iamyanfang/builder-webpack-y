const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: '10000ms',
})

// 该方法用于更改进程的当前目录，将当前目录改成tempalte
process.chdir(path.join(__dirname, './template'));

//先删除dist文件
rimraf('./dist').then(() => {
  const prodConfig = require('../../lib/webpack.prod.js');
  webpack(prodConfig, (err, stats) => {
    if(err) {
      console.log(err);
      process.exit(2);
    }
    // console.log(stats.toString({
    //   colors: true,
    //   modules: false,
    //   children: false
    // }));

    console.log('构建成功，开始执行测试用例 ！！！！')
    mocha.addFile(path.join(__dirname, './html-test.js'))
    mocha.addFile(path.join(__dirname, './css-js-test.js'));
    
    mocha.run();
  })
})

