import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions';

class LoginForm extends Component {
  state = {
    password: '',
    username: ''
  };

  setUserLoginState() {
    //redux isLogedin true korbo . by default alys isLogin  false
    this.props.login();
    this.props.history.push('/');
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setUserLoginState();
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const user = { username: this.state.username, password: this.state.password };
    console.log(user);

    Axios.post(`http://frontend.interview.dingi.work/user/login/`, { ...user }).then(res => {
      localStorage.setItem('token', res.data.jwt_token);
      this.setUserLoginState();
      //
    });
  };

  render() {
    // const state = useSelector(state => state.isLogged);
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>{this.props.isLogged}</h1>
        <FormGroup>
          <Label>User Name</Label>
          <Input
            placeholder={'User Name'}
            value={this.state.username}
            onChange={({ target }) => this.setState({ username: target.value })}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            placeholder={'Password'}
            value={this.state.password}
            onChange={({ target }) => this.setState({ password: target.value })}
            type="password"
          />
        </FormGroup>

        <FormGroup>
          <Button color="primary" block className="mt-3" type="submit">
            Log in
          </Button>
        </FormGroup>
      </Form>
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
    login
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(withRouter(LoginForm));
