import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './App.css';

import Nav from './component/Nav';
import routes from './route';

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="App">
        {(this.props.location.pathname !== '/') ? (<Nav />) : null}
        { routes }
      </div>
    );
  }
}

export default withRouter(App);
