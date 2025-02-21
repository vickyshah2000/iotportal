import React, { Fragment, useState, useEffect } from "react";
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
import { Table, Row, Col, Button, Input, Modal, ModalHeader } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { useHistory } from "react-router-dom";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  searchText,
  setSearchText,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(searchText);

  const onChange = useAsyncDebounce((value) => {
    setSearchText(value);
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Col>
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

function TableContainer({
  columns,
  data,
  isGlobalFilter,
  isAddOptions,
  customPageSize,
  setCustomPageSize,
  pageNumber,
  setPageNumber,
  searchText,
  setSearchText,
  totalCount,
  className,
}) {
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
    state: { pageIndex, pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: pageNumber - 1, // Start from 0-based index
        pageSize: customPageSize,
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

  // useEffect(() => {
  //   gotoPage(pageNumber - 1); // Ensure page matches pageNumber state
  // }, [pageNumber, gotoPage]);

  const onChangeInSelect = (event) => {
    const pageSize = Number(event.target.value);
    setPageSize(pageSize); // Update page size
    setCustomPageSize(pageSize);
    setPageNumber(1); // Reset to first page
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

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const history = useHistory();

  function addNewEntity() {
    // setModal(true);
    history.push("/register-demo");
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

        <Col>
          {isGlobalFilter && (
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          )}
        </Col>
        {isAddOptions && (
          <Col sm="11">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={addNewEntity}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Entity
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
              disabled={!canPreviousPage}
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
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}

TableContainer.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  isGlobalFilter: PropTypes.bool,
  isAddOptions: PropTypes.bool,
  customPageSize: PropTypes.number.isRequired,
  setCustomPageSize: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  totalCount: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default TableContainer;
