
const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template'))

describe('builder-webpack test case',function(){
  require('./unit/webpack-base-test')
})