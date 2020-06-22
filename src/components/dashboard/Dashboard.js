import React from 'react';
import Context from '../../context/Context';
import DashboardChart from './DashboardChart';

const Dashboard = () => {
  return (
    <Context.Consumer>
      {({ salesBarData, salesPaiData }) => (
        <DashboardChart barData={salesBarData} pieData={salesPaiData} name="Sale Dashboard" />
      )}
    </Context.Consumer>
  );
};

export default Dashboard;
