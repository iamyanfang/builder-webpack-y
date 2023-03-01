import React from "react";
import ReactDOM from "react-dom";
import './search.less';
import logo from './images/logo.jpg';
import { print } from "../../common";

print();

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Text: null
    }
  }
  
  loadComponent() {
    //动态import，返回promise对象
    import('./text.js').then(Text => {
      this.setState({
        Text: Text.default
      })
    });
  }

  render() {
    const { Text } = this.state
    return <div className="search-text">
      Search Text哈哈哈哈
      <img src={logo}  onClick={this.loadComponent.bind(this)}/>
      {
        Text ? 
          <Text> </Text> :
          ''
      }
    </div>
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)