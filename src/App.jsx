import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import React from 'react';
import Clicker from "./Clicker";

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        view: <Clicker />
    }
  }

  render() {
      return (
          <div>
              { this.state.view }
          </div>
      )
  }
}
