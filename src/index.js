import React from 'react';
import {Component} from 'react'
import ReactDom from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
    this.placeholder = document.createElement('li');
    this.placeholder.className = 'placeholder';
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
  }

  dragEnd(e) {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(this.placeholder);

    var data = this.state.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    if (this.nodePlacement == "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({data: data});

  }

  dragOver(e) {
    e.preventDefault();

    this.dragged.style.display = "none";
    if (e.target.className == "placeholder") return;
    this.over = e.target;

    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;

    // e.target.parentNode.insertBefore(this.placeholder, e.target);
    if (relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(this.placeholder, e.target.nextElementSibling);
    }
    else if (relY < height) {
      this.nodePlacement = "before"
      parent.insertBefore(this.placeholder, e.target);
    }
  }

  render() {
    return (
        <ul onDragOver={this.dragOver.bind(this)}>
          {this.state.data.map((item, i)=> {
            return (<li
                key={i}
                data-id={i}
                draggable="true"
                onDragEnd={this.dragEnd.bind(this)}
                onDragStart={this.dragStart.bind(this)}

            >{item}</li>)
          })
          }
        </ul>
    );
  }
}

var colors = ["Red", "Green", "Blue", "Yellow", "Black", "White", "Orange"];

ReactDom.render(
    <App data={colors}/>,
    document.getElementById('app')
);