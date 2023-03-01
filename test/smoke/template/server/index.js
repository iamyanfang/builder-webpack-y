//hack 服务器端没有window
if(typeof window === 'undefined') {
  global.window = {};
}

const express = require('express');
const fs = require('fs');
const path = require('path');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server')

const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8')


const server = (port) => {
  const app = express();

  app.use(express.static('dist'));

  app.get('/search', (req, res) => {
    //返回字符串,
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log('Server is running on port: '+ port)
  })
}

server(process.env.PORT || 3000);

//将字符串转成html
const renderMarkup = (str) => {
  return template.replace('<!--HTML_PLACEHOLDER-->', str)
}