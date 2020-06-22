import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { changeLoginState } from '../actions';
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

const mapDispatchToProps = () => {
  return {
    changeLoginState
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(PrivateRoute);
