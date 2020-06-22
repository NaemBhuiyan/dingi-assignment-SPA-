import React, { Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Badge from 'reactstrap/es/Badge';
import { Button, Col, Row } from 'reactstrap';
import ButtonIcon from '../common/ButtonIcon';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';

// const CustomTotal = ({ sizePerPage, totalSize, page, lastIndex }) => (
//   <span>
//     {(page - 1) * sizePerPage + 1} to {lastIndex > totalSize ? totalSize : lastIndex} of {totalSize} —{' '}
//   </span>
// );

const customerFormatter = customerName => (
  <Link to="pages/customer-details" className="font-weight-semi-bold">
    {customerName}
  </Link>
);

const badgeFormatter = status => {
  let color = '';
  let text = '';
  switch (status) {
    case 'Dhaka':
      color = 'success';
      text = 'Dhaka';
      break;
    case 'Rangpur':
      color = 'primary';
      text = 'Rangpur';
      break;
    case 'Chittagong':
      color = 'primary';
      text = 'Chittagong';
      break;
    default:
      color = 'warning';
      text = 'Sylhet';
  }
  return (
    <Badge color={`soft-${color}`} className="rounded-capsule fs--1 font-weight-normal">
      {text}
    </Badge>
  );
};

const amountFormatter = amount => <Fragment>{amount}</Fragment>;

const columns = [
  {
    dataField: 'customer_name',
    text: 'Customer Name',
    formatter: customerFormatter,
    sort: true
  },
  {
    dataField: 'product',
    text: 'Product',
    sort: true
  },
  {
    dataField: 'customer_work_area',
    text: 'Customer Work Area',
    sort: true
  },
  {
    dataField: 'district',
    text: 'District',
    formatter: badgeFormatter,
    sort: true
  },
  {
    dataField: 'order_quantity',
    text: 'Order Quantity',
    formatter: amountFormatter,
    sort: true,
    align: 'center'
  },
  {
    dataField: 'date',
    text: 'Date',
    align: 'center',
    headerAlign: 'center',
    sort: true
  }
];
let table = createRef();
const handleNextPage = ({ page, onPageChange }) => () => {
  onPageChange(page + 1);
};

const handlePrevPage = ({ page, onPageChange }) => () => {
  onPageChange(page - 1);
};

const handleViewAll = ({ onSizePerPageChange }, newSizePerPage) => {
  onSizePerPageChange(newSizePerPage, 1);
};

const PurchasesTable = ({ selected }) => {
  return (
    <Context.Consumer>
      {({ dingiData }) => {
        const options = {
          custom: true,
          sizePerPage: 10,
          totalSize: dingiData.length
        };
        const filterData = selected => {
          if (selected[0] === 'district') {
            const data = dingiData.filter(({ district }) => district === selected[1]);
            return data;
          }
          const data = dingiData.filter(({ product }) => product === selected[1]);
          return data;
        };
        return (
          <PaginationProvider pagination={paginationFactory(options)}>
            {({ paginationProps, paginationTableProps }) => {
              const lastIndex = paginationProps.page * paginationProps.sizePerPage;

              return (
                <Fragment>
                  <div className="table-responsive">
                    <BootstrapTable
                      ref={table}
                      bootstrap4
                      keyField="id"
                      data={filterData(selected).length > 0 ? filterData(selected) : dingiData}
                      columns={columns}
                      // selectRow={selectRow(onSelect)}
                      bordered={false}
                      classes="table-dashboard table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap"
                      rowClasses="btn-reveal-trigger"
                      headerClasses="bg-200 text-900"
                      {...paginationTableProps}
                    />
                  </div>
                  <Row noGutters className="px-1 py-3">
                    <Col className="pl-3 fs--1">
                      {/* <CustomTotal {...paginationProps} lastIndex={lastIndex} /> */}
                      <ButtonIcon
                        color="link"
                        size="sm"
                        icon="chevron-right"
                        iconAlign="right"
                        transform="down-1 shrink-4"
                        className="px-0 font-weight-semi-bold"
                        onClick={() => handleViewAll(paginationProps, dingiData.length)}
                      >
                        view all
                      </ButtonIcon>
                    </Col>
                    <Col xs="auto" className="pr-3">
                      <Button
                        color={paginationProps.page === 1 ? 'light' : 'primary'}
                        size="sm"
                        onClick={handlePrevPage(paginationProps)}
                        disabled={paginationProps.page === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        color={lastIndex >= paginationProps.totalSize ? 'light' : 'primary'}
                        size="sm"
                        className="ml-2 px-4"
                        onClick={handleNextPage(paginationProps)}
                        disabled={lastIndex >= paginationProps.totalSize}
                      >
                        Next
                      </Button>
                    </Col>
                  </Row>
                </Fragment>
              );
            }}
          </PaginationProvider>
        );
      }}
    </Context.Consumer>
  );
};

PurchasesTable.propTypes = { value: PropTypes.any };

PurchasesTable.defaultProps = { value: `PurchasesTable` };

export default PurchasesTable;
