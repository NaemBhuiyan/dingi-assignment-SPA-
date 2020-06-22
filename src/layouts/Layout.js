import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DashboardLayout from './DashboardLayout';
import ErrorLayout from './ErrorLayout';
import Login from '../components/auth/Login';
import PrivateRoute from './PrivateRoute';

class Layout extends Component {
  state = {
    user: null
  };

  setUser = user => this.setState({ user });

  render() {
    return (
      <Router fallback={<span />}>
        <Switch>
          <Route path="/login" exact component={() => <Login setUser={this.setUser} />} />
          <PrivateRoute component={DashboardLayout} />

          {/* <Route path="/errors" component={ErrorLayout} /> */}
        </Switch>
      </Router>
    );
  }
}

export default Layout;
