import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "regenerator-runtime/runtime";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Define a default UI for filtering
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
  data,
  isGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  setCustomPageSize,
  pageNumber,
  setPageNumber,
  totalCount,
  className,
  entityId,
  entityName,

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
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: pageNumber - 1,
        pageSize: customPageSize,
        // sortBy: [
        //   {
        //     desc: true,
        //   },
        // ],
      },
      manualPagination: true, // Enable manual pagination
      pageCount: Math.ceil(totalCount / customPageSize), // Calculate total pages
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );


  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    const pageSize = Number(event.target.value);
    setPageSize(pageSize); // Update page size in react-table
    setCustomPageSize(pageSize); // Update custom page size in the parent
    setPageNumber(1); // Reset to first page when page size changes
    gotoPage(0); // Go to the first page in react-table
  };


  const onChangeInInput = (event) => {
    setPageNumber(event.target.value);
    const page = event.target.value ? Number(event.target.value) : "";
  };

  const nextCustomPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const previousCustomPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const history = useHistory()
  const handleEntityAddress = () => {
    console.log('table container entity id:- ', entityId)
    console.log('table container entity Name:- ', entityName)
    history.push("/add-address", { entityId: entityId, entityName: entityName })
  }
  return (
    <Fragment>
      <Row className="mb-2">
        <Col md={2}>
          <select
            className="form-select"
            value={customPageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50, 100].map((size) => (
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
        {isAddOptions && (
          <Col sm="11">
            <div className="text-sm-end">
              <div className="d-inline-block me-2">
                <input
                  type="text"
                  className="form-control"
                  value={entityName}
                  readOnly
                />
              </div>
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={handleEntityAddress}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Address
              </Button>
            </div>
          </Col>
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

      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
        <thead className="table-light table-nowrap">
            {headerGroups?.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      <span style={{ marginLeft: "5px" }}>
                        {generateSortingIndicator(column)}
                      </span>
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page?.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td key={cell.id} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={() => {
                previousPage();
                previousCustomPage();
              }}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageNumber} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageNumber}
            value={pageNumber}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={() => {
                nextPage();
                nextCustomPage();
              }}
              disabled={!canNextPage}
            >
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
  customPageSize: PropTypes.number.isRequired,
  setCustomPageSize: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default TableContainer;
