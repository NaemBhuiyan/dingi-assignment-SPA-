import React from 'react';
import PropTypes from 'prop-types';
import { NavItem } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import NavbarVerticalMenuItem from './NavbarVerticalMenuItem';

const NavbarVerticalMenu = ({ routes, handleNavbarVerticalCollapse }) => {
  return routes.map((route, index) => (
    <NavItem key={index}>
      <NavLink className="nav-link" {...route} onClick={handleNavbarVerticalCollapse}>
        <NavbarVerticalMenuItem route={route} />
      </NavLink>
    </NavItem>
  ));
};

NavbarVerticalMenu.propTypes = {
  routes: PropTypes.array.isRequired
};

export default withRouter(NavbarVerticalMenu);
