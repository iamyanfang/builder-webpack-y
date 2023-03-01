
const assert = require('assert');
describe('webpack.base.js test case', function() {
  const baseConfig = require('../../lib/webpack.base');

  // console.log(baseConfig);

  it('entry', function() {
    assert.equal(baseConfig.entry.index, 'E:/learn2022/job/_webpack/my-project/builder-webpack/test/smoke/template/src/index/index.js');
    assert.equal(baseConfig.entry.search, 'E:/learn2022/job/_webpack/my-project/builder-webpack/test/smoke/template/src/search/index.js')
  })
})