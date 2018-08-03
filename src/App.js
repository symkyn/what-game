import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './App.css';

import Nav from './component/Nav/Nav';
import routes from './route';

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log(this.props.location.pathname);
    return (
      <div className="App">
        {((this.props.location.pathname !== '/') ||
         (this.props.location.pathname !== '/login') ||
         (this.props.location.pathname !== '/register')) ? (<Nav />) : null}
        { routes }
      </div>
    );
  }
}

export default withRouter(App);
