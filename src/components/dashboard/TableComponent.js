import React, { useState } from 'react';
import { Card, CardBody, InputGroup, CustomInput } from 'reactstrap';
import FalconCardHeader from '../common/FalconCardHeader';
import PurchasesTable from './PurchasesTable';

const TableComponent = () => {
  const [selected, setSelected] = useState([]);
  console.log('item-list');

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Recent Purchases" light={false}>
        <InputGroup
          size="sm"
          className="input-group input-group-sm"
          onChange={({ target }) => setSelected([target.id, target.value])}
        >
          <CustomInput type="select" id="district">
            <option>District</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chittagong">Chittagong</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Sylhet">Sylhet</option>
          </CustomInput>
          <CustomInput type="select" className="ml-3" id="product">
            <option>Product</option>
            <option value="AssetLock">AssetLock</option>
            <option value="CarTracker">CarTracker</option>
            <option value="EagleCam">EagleCam</option>
            <option value="MotoTracker">"MotoTracker"</option>
          </CustomInput>
        </InputGroup>
      </FalconCardHeader>
      <CardBody className="p-0">
        <PurchasesTable selected={selected} />
      </CardBody>
    </Card>
  );
};

export default TableComponent;
