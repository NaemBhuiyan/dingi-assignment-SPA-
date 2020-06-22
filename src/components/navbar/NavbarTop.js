import React, { useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, NavItem, Nav, NavLink } from 'reactstrap';
import AppContext from '../../context/Context';
import Logo from './Logo';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { logout } from '../../actions';

const NavbarTop = props => {
  const { showBurgerMenu, setShowBurgerMenu } = useContext(AppContext);

  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    props.logout();

    props.history.push('/');
  };

  return (
    <Navbar light className="navbar-glass fs--1 font-weight-semi-bold row navbar-top sticky-kit" expand>
      <NavbarToggler onClick={() => setShowBurgerMenu(!showBurgerMenu)} id="burgerMenu" />
      <Logo at="navbar-top" width={40} id="topLogo" />
      <Collapse navbar>
        <Nav navbar className="align-items-center">
          <NavItem>
            <NavLink tag={Link} to="/">
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/item-list">
              Item List
            </NavLink>
          </NavItem>
        </Nav>

        <Nav navbar className="align-items-center ml-auto">
          <NavItem>
            <NavLink tag={Link} to="/" onClick={handleLogout}>
              Logout
              <FontAwesomeIcon icon="sign-out-alt" className="ml-2" />
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => {
  return {
    isLogged: state.isLogged
  };
};

const mapDispatchToProps = () => {
  return {
    logout
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(withRouter(NavbarTop));
