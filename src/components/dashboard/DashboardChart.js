import React from 'react';

import { Row, Col, Card } from 'reactstrap';

import FalconCardHeader from '../common/FalconCardHeader';

import Chart from '../chart/Chart';
const DashboardChart = ({ barData, pieData, name }) => {
  return (
    <Row noGutters>
      <Col className="text-center my-4">
        <h1> {name}</h1>
      </Col>
      <Col lg="12" className="mb-5">
        <Card>
          <FalconCardHeader title="Bar Chart" />
          <Card body>
            <Chart config={barData} />
          </Card>
        </Card>
      </Col>
      <Col lg="12">
        <Card>
          <FalconCardHeader title="Pie Chart" />
          <Card body>
            <Chart config={pieData} />
          </Card>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardChart;
