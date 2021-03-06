import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
class PrivateRoute extends Component {
  render() {
    const { component: Component, isLogged, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isLogged ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    isLogged: state.isLogged
  };
};

export default connect(mapStateToProps)(PrivateRoute);
