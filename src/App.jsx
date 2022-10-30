import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import React from 'react';
import Clicker from "./Clicker";
import Scroller from "./Scroller";

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        index: 0,
    };

    this.toggle.bind(this);
    this.keyDown.bind(this);
  }

  toggle() {
      this.setState({ index: this.state.index + 1 });
  }

  keyDown(e) {
      if (e.key === 'Tab') this.toggle();
  }

  render() {
      return this.state.index % 2 === 1
          ? <Scroller onKeyDown={this.keyDown} />
          : <Clicker onKeyDown={this.keyDown} />;
  }
}
