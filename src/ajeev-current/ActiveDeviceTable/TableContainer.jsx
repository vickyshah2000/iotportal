import React, { Fragment, useState } from "react";
import "regenerator-runtime/runtime";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import {
  Table,
  Row,
  Col,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { useHistory } from "react-router-dom";

import DeviceDataTable from "../DeviceDataTable";
import IndividualChart from "../common/IndividualChart";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Col sm={4}>
      <div className="search-box me-2 mb-2 d-inline-block">
        <div className="position-relative">
          <label htmlFor="search-bar-0" className="search-label">
            <span id="search-bar-0-label" className="sr-only">
              Search this table
            </span>
            <input
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              id="search-bar-0"
              type="text"
              className="form-control"
              placeholder={`${count} records...`}
              value={value || ""}
            />
          </label>
          <i className="bx bx-search-alt search-icon"></i>
        </div>
      </div>
    </Col>
  );
}

const TableContainer = ({
  columns,
  data = [],
  isGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize = 10,
  className,
  customPageSizeOptions,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
    toggleRowExpanded,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        isExpanded: false,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );
  const [open, setOpen] = useState(false);
  const [imei, setImei] = useState();

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const handleRowClick = (row) => {
    toggleRowExpanded(row.id);
  };

  const handleEditRow = (row) => {
    console.log("Edit row data:", row.original);
    setOpen(true);
    setImei(row.original.imie);
    // Add your edit functionality here, e.g., navigate to edit page
  };

  const toggleChart = () => {
    setOpen(false);
  };

  const history = useHistory();

  return (
    <Fragment>
      <Row className="mb-2">
        <Col md={customPageSizeOptions ? 2 : 1}>
          <select
            className="form-select"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}
        {isAddUserList && (
          <Col sm="11">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        {isAddCustList && (
          <Col sm="11">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded mb-2 me-2"
                onClick={handleCustomerClick}
              >
                <i className="mdi mdi-plus me-1" />
                New Customers
              </Button>
            </div>
          </Col>
        )}
      </Row>
      <Modal
        isOpen={open}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggleChart}
      >
        <div>
          <ModalHeader toggle={toggleChart}>Chart View</ModalHeader>
          <ModalBody>
            <p className="mb-2"></p>
            <IndividualChart imei={imei} />
            {/* <MapView height="64vh" data={mapData} /> */}
          </ModalBody>
        </div>
      </Modal>
      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {/* <th></th> */}
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div className="mb-2">
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
                {/* <th>
                         <div className="mb-2">
                           View
                           {generateSortingIndicator(columns[0])}
                         </div>
                         <Filter column={columns[0]} />
                       </th> */}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr {...row.getRowProps()}>
                    {/* <td>
                             <Button
                               className="btn-warning"
                               style={{ lineHeight: "1" }}
                               onClick={() => handleRowClick(row)}
                             >
                               {row.isExpanded ? (
                                 <i
                                   className="bx bx-minus"
                                   style={{ fontSize: "large" }}
                                 ></i>
                               ) : (
                                 <i
                                   className="bx bx-plus"
                                   style={{ fontSize: "large" }}
                                 ></i>
                               )}
                             </Button>
                           </td> */}
                    {row.cells.map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          {...cell.getCellProps()}
                        // onClick={(event) => handleCellClick(event, cell)}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                    {/* <td>
                             <Button color="info" onClick={() => handleEditRow(row)}>
                               <i className="bx bx-bar-chart-alt"></i>
                             </Button>
                           </td> */}
                  </tr>
                  {/* {row.isExpanded && (
                           <tr>
                             <td colSpan={columns.length + 1}>
                               <DeviceDataTable id={row.original.imie} />
                             </td>
                           </tr>
                         )} */}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </Col>
        <Col className="col-md-auto">
          <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
            {">"}
          </Button>
          <Button
            color="primary"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  isGlobalFilter: PropTypes.bool,
  isAddOptions: PropTypes.bool,
  isAddUserList: PropTypes.bool,
  handleOrderClicks: PropTypes.func,
  handleUserClick: PropTypes.func,
  handleCustomerClick: PropTypes.func,
  isAddCustList: PropTypes.bool,
  customPageSize: PropTypes.number,
  className: PropTypes.string,
  customPageSizeOptions: PropTypes.bool,
};

export default TableContainer;
