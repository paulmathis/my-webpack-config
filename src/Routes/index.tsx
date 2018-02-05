import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './Admin';
import ErrorPage from './ErrorPage';
import Home from './Home';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
