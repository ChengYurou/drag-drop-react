import React from 'react';
import {Component} from 'react'
import ReactDom from 'react-dom';

var colors = ["Red", "Green", "Blue", "Yellow", "Black", "White", "Orange"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  render() {
    return (
        <ul>
          {this.props.data.map(item => <li>{item}</li>)}
        </ul>
    );
  }
}

ReactDom.render(
    <App data={colors}/>,
    document.getElementById('app')
);