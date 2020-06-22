import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import CustomerDashboard from '../components/dashboard/CustomerDashboard';
import NavbarTop from '../components/navbar/NavbarTop';
import NavbarVertical from '../components/navbar/NavbarVertical';
import Footer from '../components/footer/Footer';

import TableComponent from '../components/dashboard/TableComponent';

const DashboardLayout = props => {
  return (
    <div className="container">
      <NavbarVertical />
      <div className="content">
        <NavbarTop />
        <Switch>
          {/* <Route path="/errors" component={ErrorLayout} /> */}
          <Route path="/" exact component={Dashboard} />
          <Route path="/item-list" exact component={TableComponent} />
          <Route path="/customer" exact component={CustomerDashboard} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
};

DashboardLayout.propTypes = { location: PropTypes.object.isRequired };

export default DashboardLayout;
