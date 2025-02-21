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
import DeviceReportTable from "./DeviceReportTable"
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
  const [displayData, setDisplayData] = useState(data);
  const [open, setOpen] = useState(false);
  const [imei, setImei] = useState();

  useEffect(() => {
    // Set displayData to the full data when data prop changes
    setDisplayData(data);
  }, [data]);

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
  //pagination
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
  //end

  const handleRowClick = (row) => {
    toggleRowExpanded(row.id);
  };

  const handlemodal = (row) => {
    setOpen(true);
    setImei(row.original.imie);
  };

  const toggleChart = () => {
    setOpen(false);
  };

  const history = useHistory();
  const [beforeDate, setBeforeDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeWise, setTimeWise] = useState("");

  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedZone, setSelectedZone] = useState("All");
  const [selectedASM, setSelectedASM] = useState("All");
  const [selectedOfficer, setSelectedOfficer] = useState("All");

  const handleBdateChange = (event) => {
    setBeforeDate(event.target.value);
  };

  const handleEdateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTimeWise(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };

  const handleASMChange = (event) => {
    setSelectedASM(event.target.value);
  };

  const handleOfficerChange = (event) => {
    setSelectedOfficer(event.target.value);
  };

  const handleSearch = () => {
    const filteredData = data.filter((item) => {
      return (
        (selectedRegion === "All" || item.regionname === selectedRegion) &&
        (selectedZone === "All" || item.zonename === selectedZone) &&
        (selectedASM === "All" || item.ASM == selectedASM) &&
        (selectedOfficer === "All" || item.SO == selectedOfficer)
      );
    });
    setDisplayData(filteredData);
    console.log(filteredData);
  };

  return (
    <Fragment>
      <Col sm={12}>
        <Row>
          <Col sm={3}>
            <input
              className="form-control"
              type="date"
              title="Start Date"
              onChange={handleBdateChange}
            />
          </Col>
          <Col sm={3}>
            <input
              className="form-control"
              type="date"
              title="End Date"
              onChange={handleEdateChange}
            />
          </Col>
          <Col sm={3}>
            <input
              className="form-control"
              type="number"
              placeholder="(Minute)"
              onChange={handleTimeChange}
            />
          </Col>
        </Row>
      </Col>
      <Col sm={12}>
        <br />
        <br />
        <div className="filter-box me-2 mb-2">
          <Row>
            <Col sm={3}>
              <div className="position-relative">
                <select className="form-control" onChange={handleRegionChange}>
                  <option value="All">All Regions</option>
                  <option value="West">West</option>
                  <option value="MT">MT</option>
                </select>
              </div>
            </Col>
            <Col sm={3}>
              <div className="position-relative mt-2 mt-sm-0">
                <select className="form-control" onChange={handleZoneChange}>
                  <option value="All">All Zones</option>
                  <option value="SOUTH-L">SOUTH-L</option>
                  <option value="WEST-1">WEST-1</option>
                </select>
              </div>
            </Col>
            {/* <Col sm={2}>
              <div className="position-relative mt-2 mt-sm-0">
                <select className="form-control" onChange={handleASMChange}>
                  <option value="All">All Asm</option>
                  <option value="MINAZ SAGARI">MINAZ SAGARI</option>
                  <option value="AKSHAY D">AKSHAY D</option>
                </select>
              </div>
            </Col>
            <Col sm={2}>
              <div className="position-relative mt-2 mt-sm-0">
                <select className="form-control" onChange={handleOfficerChange}>
                  <option value="All">All Officers</option>
                  <option value="LAXMI LODHI">LAXMI LODHI</option>
                  <option value="JAGADISH PATIL">JAGADISH PATIL</option>
                </select>
              </div>
            </Col> */}
            <Col sm={2}>
              <div className="position-relative mt-2 mt-sm-0">
                <button
                  onClick={handleSearch}
                  className="btn btn-secondary w-100"
                >
                  Search
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <br />
      <br />

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
          </ModalBody>
        </div>
      </Modal>
      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                <th></th>
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
                <th>
                  <div className="mb-2">
                    View
                    {generateSortingIndicator(columns[0])}
                  </div>
                  <Filter column={columns[0]} />
                </th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr {...row.getRowProps()}>
                    <td>
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
                    </td>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                    <td>
                      <Button color="info" onClick={() => handlemodal(row)}>
                        <i className="bx bx-bar-chart-alt"></i>
                      </Button>
                    </td>
                  </tr>
                  {row.isExpanded && (
                    <tr>
                      <td colSpan={columns.length + 1} >
                        <DeviceReportTable
                          id={row.original.imie}
                          beforeDate={beforeDate}
                          endDate={endDate}
                          timeWise={timeWise}
                        />
                      </td>
                    </tr>
                  )}
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
