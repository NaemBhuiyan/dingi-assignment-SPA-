import React from 'react';
import { Col, Row, Card, CardBody, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Logo from '../navbar/Logo';

const Login = ({ setUser }) => {
  return (
    <section className="py-0">
      <Container>
        <Row className="flex-center min-vh-100 py-6">
          <Col sm={10} md={8} lg={6} xl={5} className="col-xxl-4">
            <Logo />
            <Card>
              <CardBody className="fs--1 font-weight-normal p-5">
                <Row className="text-left justify-content-between">
                  <Col xs="auto">
                    <h5>Log in</h5>
                  </Col>
                  <Col xs="auto">
                    <p className="fs--1 text-600">
                      or <Link to="/authentication/basic/register">create an account</Link>
                    </p>
                  </Col>
                </Row>
                <LoginForm setUser={setUser} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
