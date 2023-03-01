const glob = require('glob-all');

describe('checking generated html files', () => {
  console.log(1111)
  it('should generate html files', (done) => {
    const files = glob.sync([
      './dist/index.html',
      './dist/search.html'
    ])

    console.log('html test', files)

    if(files.length > 0) {
      done();
    } else {
      throw new Error('no html files generate')
    }
  })
})