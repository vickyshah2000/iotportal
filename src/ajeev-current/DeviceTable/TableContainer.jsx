// import React, { Fragment } from "react";
// import "regenerator-runtime/runtime";
// import PropTypes from "prop-types";
// import {
//   useTable,
//   useGlobalFilter,
//   useAsyncDebounce,
//   useSortBy,
//   useFilters,
//   useExpanded,
//   usePagination,
// } from "react-table";
// import { Table, Row, Col, Button, Input } from "reactstrap";
// import { Filter, DefaultColumnFilter } from "./Filters";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// // Define a default UI for filtering
// function GlobalFilter({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
// }) {
//   const count = preGlobalFilteredRows.length;
//   const [value, setValue] = React.useState(globalFilter);
//   const onChange = useAsyncDebounce((value) => {
//     setGlobalFilter(value || undefined);
//   }, 200);

//   return (
//     <Col sm={4}>
//       <div className="search-box me-2 mb-2 d-inline-block">
//         <div className="position-relative">
//           <label htmlFor="search-bar-0" className="search-label">
//             <span id="search-bar-0-label" className="sr-only">
//               Search this table
//             </span>
//             <input
//               onChange={(e) => {
//                 setValue(e.target.value);
//                 onChange(e.target.value);
//               }}
//               id="search-bar-0"
//               type="text"
//               className="form-control"
//               placeholder={${count} records...}
//               value={value || ""}
//             />
//           </label>
//           <i className="bx bx-search-alt search-icon"></i>
//         </div>
//       </div>
//     </Col>
//   );
// }

// const TableContainer = ({
//   columns,
//   data,
//   isGlobalFilter,
//   isAddOptions,
//   isAddUserList,
//   handleOrderClicks,
//   handleUserClick,
//   handleCustomerClick,
//   isAddCustList,
//   customPageSize,
//   className,
//   customPageSizeOptions,
// }) => {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state,
//     preGlobalFilteredRows,
//     setGlobalFilter,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       defaultColumn: { Filter: DefaultColumnFilter },
//       initialState: {
//         pageIndex: 0,
//         pageSize: customPageSize,
//       },
//     },
//     useGlobalFilter,
//     useFilters,
//     useSortBy,
//     useExpanded,
//     usePagination
//   );

//   const generateSortingIndicator = (column) => {
//     return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
//   };

//   const onChangeInSelect = (event) => {
//     setPageSize(Number(event.target.value));
//   };

//   const onChangeInInput = (event) => {
//     const page = event.target.value ? Number(event.target.value) - 1 : 0;
//     gotoPage(page);
//   };
//   const history = useHistory();

//   // function addNewDevice() {
//   //   history.push("/device-demo");
//   // }
//   return (
//     <Fragment>
//       <Row className="mb-2">
//         <Col md={customPageSizeOptions ? 2 : 1}>
//           <select
//             className="form-select"
//             value={pageSize}
//             onChange={onChangeInSelect}
//           >
//             {[10, 20, 30, 40, 50].map((pageSize) => (
//               <option key={pageSize} value={pageSize}>
//                 Show {pageSize}
//               </option>
//             ))}
//           </select>
//         </Col>
//         {isGlobalFilter && (
//           <GlobalFilter
//             preGlobalFilteredRows={preGlobalFilteredRows}
//             globalFilter={state.globalFilter}
//             setGlobalFilter={setGlobalFilter}
//           />
//         )}
//         {/* {isAddOptions && (
//           <Col sm="11">
//             <div className="text-sm-end">
//               <Button
//                 type="button"
//                 color="success"
//                 className="btn-rounded  mb-2 me-2"
//                 onClick={addNewDevice}
//               >
//                 <i className="mdi mdi-plus me-1" />
//                 Add New Device
//               </Button>
//             </div>
//           </Col>
//         )} */}
//         {isAddUserList && (
//           <Col sm="11">
//             <div className="text-sm-end">
//               <Button
//                 type="button"
//                 color="primary"
//                 className="btn mb-2 me-2"
//                 onClick={handleUserClick}
//               >
//                 <i className="mdi mdi-plus-circle-outline me-1" />
//                 Create New User
//               </Button>
//             </div>
//           </Col>
//         )}
//         {isAddCustList && (
//           <Col sm="11">
//             <div className="text-sm-end">
//               <Button
//                 type="button"
//                 color="success"
//                 className="btn-rounded mb-2 me-2"
//                 onClick={handleCustomerClick}
//               >
//                 <i className="mdi mdi-plus me-1" />
//                 New Customers
//               </Button>
//             </div>
//           </Col>
//         )}
//       </Row>

//       <div className="table-responsive react-table">
//         <Table bordered hover {...getTableProps()} className={className}>
//           <thead className="table-light table-nowrap">
//             {headerGroups.map((headerGroup) => (
//               <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th key={column.id}>
//                     <div className="mb-2" {...column.getSortByToggleProps()}>
//                       {column.render("Header")}
//                       {generateSortingIndicator(column)}
//                     </div>
//                     <Filter column={column} />
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <Fragment key={row.getRowProps().key}>
//                   <tr>
//                     {row.cells.map((cell) => {
//                       return (
//                         <td key={cell.id} {...cell.getCellProps()}>
//                           {cell.render("Cell")}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 </Fragment>
//               );
//             })}
//           </tbody>
//         </Table>
//       </div>

//       <Row className="justify-content-md-end justify-content-center align-items-center">
//         <Col className="col-md-auto">
//           <div className="d-flex gap-1">
//             <Button
//               color="primary"
//               onClick={() => gotoPage(0)}
//               disabled={!canPreviousPage}
//             >
//               {"<<"}
//             </Button>
//             <Button
//               color="primary"
//               onClick={previousPage}
//               disabled={!canPreviousPage}
//             >
//               {"<"}
//             </Button>
//           </div>
//         </Col>
//         <Col className="col-md-auto d-none d-md-block">
//           Page{" "}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>
//         </Col>
//         <Col className="col-md-auto">
//           <Input
//             type="number"
//             min={1}
//             style={{ width: 70 }}
//             max={pageOptions.length}
//             defaultValue={pageIndex + 1}
//             onChange={onChangeInInput}
//           />
//         </Col>

//         <Col className="col-md-auto">
//           <div className="d-flex gap-1">
//             <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
//               {">"}
//             </Button>
//             <Button
//               color="primary"
//               onClick={() => gotoPage(pageCount - 1)}
//               disabled={!canNextPage}
//             >
//               {">>"}
//             </Button>
//           </div>
//         </Col>
//       </Row>
//     </Fragment>
//   );
// };

// TableContainer.propTypes = {
//   preGlobalFilteredRows: PropTypes.any,
// };

// export default TableContainer;



import React, { Fragment } from "react";
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
import { Table, Row, Col, Button, Input } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { useHistory } from "react-router-dom";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
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
  data = [], // Default to an empty array if data is not provided
  isGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize = 10, // Default pageSize if not provided
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
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const history = useHistory();
  
  const handleAddDevice=(()=>{
    console.log("Device table container")
    history.push("/devicereg-demo")
  })

  return (
    <Fragment>
      <Row className="mb-2">
        {/* Page Size Selector */}
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
        {/* *************  button add new device********************* */}
        {isAddOptions && (
          <Col sm="11">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={()=> handleAddDevice()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Device
              </Button>
            </div>
          </Col>
        )}
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

      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap ">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th key={column.id}>
                    <div className="mb-2" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map(cell => (
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

      {/* Pagination */}
      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </Button>
            <Button color="primary" onClick={previousPage} disabled={!canPreviousPage}>
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
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
          <Button color="primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
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