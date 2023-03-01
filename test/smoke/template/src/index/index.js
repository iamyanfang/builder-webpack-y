import React from 'react';
import ReactDOM from 'react-dom';

import { print } from '../../common';

function hello() {
  console.log('helloword');
}

function a() {
  console.log('a');
}

hello();
a();
print();

class Index extends React.Component {
  
  render() {
    return (
      <div> index 页面 </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)