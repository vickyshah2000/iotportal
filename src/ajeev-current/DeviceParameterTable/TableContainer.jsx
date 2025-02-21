

import React, { Fragment, useState } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import PropTypes from "prop-types";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import download from "downloadjs";

// import jsPDF from "jspdf";
// import "jspdf-autotable";

import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
  useAsyncDebounce,
} from "react-table";
import { useHistory } from "react-router-dom";
import { DefaultColumnFilter } from "./filters"; // Ensure this import path is correct

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Col sm="auto">
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        bsSize="sm"
      />
    </Col>
  );
}

const TableContainer = ({
  columns,
  data,
  deviceMake,
  deviceModel,
  deviceName,
  isGlobalFilter = false,
  isAddOptions = false,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList = false,
  customPageSize,
  className,
  customPageSizeOptions,
  deviceId,
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
      initialState: { pageIndex: 0, pageSize: customPageSize || 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  const history = useHistory();

  const addNewParameter = () => {
    history.push("/add-parameter", {
      deviceId: deviceId,
      deviceMake: deviceMake,
      deviceName: deviceName,
      deviceModel: deviceModel,
    });
  };

  //pdf download************************************************************

  //  const downloadPdf = () => {
  //   try {
  //     const doc = new jsPDF({
  //       orientation: "landscape",
  //       unit: "pt",
  //       format: "a4",
  //     });

  //     const fontSize = 12;
  //     const headers = columns.map(col => col.Header);
  //     const body = data.map(row => columns.map(col => row[col.accessor]));

  //     // Add title
  //     doc.autoTable({
  //       startY: 20,
  //       head: [['Ajeevi Technology']],
  //       body: [['Device Parameter Table']],
  //       theme: 'plain',
  //       headStyles: {
  //         fillColor: [22, 160, 133],
  //         textColor: [255, 255, 255],
  //         fontSize: 18,
  //         halign: 'center',
  //         valign: 'middle',
  //       },
  //       bodyStyles: {
  //         fillColor: [255, 255, 255],
  //         textColor: [0, 0, 0],
  //         fontSize: 15,
  //         halign: 'center',
  //         valign: 'middle',
  //       },
  //       styles: {
  //         cellPadding: {top: 10, right: 10, bottom: 10, left: 10}, // padding for cells
  //       },
  //       margin: { top: 30 },
  //     });

  //     // Add table data
  //     doc.autoTable({
  //       head: [headers],
  //       body: body,
  //       startY: doc.previousAutoTable.finalY + 20, // Adjust startY based on the previous table
  //       theme: "grid",
  //       headStyles: { fillColor: [22, 160, 133], fontSize },
  //       bodyStyles: { fontSize },
  //       styles: { cellPadding: 5, fontSize },
  //       didDrawPage: function (data) {
  //         // Footer
  //         doc.setFontSize(10);
  //         const pageCount = doc.internal.getNumberOfPages();
  //         const footerText = "@Copyright 2024";
  //         for (let i = 1; i <= pageCount; i++) {
  //           doc.setPage(i);
  //           doc.text(footerText, data.settings.margin.left, doc.internal.pageSize.height - 10);
  //         }
  //       },
  //     });

  //     doc.save("DeviceParameter.pdf");
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // };

  const downloadPdf = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([842, 595]); // A4 landscape

      // Load fonts
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const timesRomanBoldFont = await pdfDoc.embedFont(
        StandardFonts.TimesRomanBold
      );

      // Add title
      const title = "Ajeevi Technology";
      const subtitle = "Device Parameter Table";

      page.drawText(title, {
        x: 30,
        y: page.getHeight() - 50,
        size: 18,
        font: timesRomanBoldFont,
        color: rgb(0.086, 0.627, 0.522),
      });

      page.drawText(subtitle, {
        x: 30,
        y: page.getHeight() - 80,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      // Prepare table data
      const fontSize = 12;
      
      const filteredColumns = columns.filter(col => col.Header !== "Action" && col.Header !== "S.No");
      const headers = ["S.No", ...filteredColumns.map((col) => col.Header)];
      // Map the body data, adding a serial number at the beginning of each row
    const body = data.map((row, rowIndex) => [
      rowIndex + 1, // Serial number
      ...filteredColumns.map((col) =>
        row[col.accessor] !== undefined ? row[col.accessor] : ""
      ),
    ]);

      console.log("Headers:", headers);
      console.log("Table Body:", body);
      // Add headers
      let yPosition = page.getHeight() - 120;
      headers.forEach((header, index) => {
        page.drawText(header, {
          x: 30 + index * 100,
          y: yPosition,
          size: fontSize,
          font: timesRomanBoldFont,
          color: rgb(0.086, 0.627, 0.522),
        });
      });

      // Add table data
      body.forEach((row, rowIndex) => {
        yPosition -= 20;
        row.forEach((cell, cellIndex) => {
          console.log(`Drawing cell [${rowIndex}][${cellIndex}]:`, cell); // Debugging line
          page.drawText(cell.toString(), {
            x: 30 + cellIndex * 100,
            y: yPosition,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
          });
        });
      });
      // Footer
      const footerText = "@Copyright 2024";
      const pageCount = pdfDoc.getPageCount();
      for (let i = 0; i < pageCount; i++) {
        const page = pdfDoc.getPage(i);
        page.drawText(footerText, {
          x: 30,
          y: 10,
          size: 10,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
      }

      const pdfBytes = await pdfDoc.save();
      download(pdfBytes, "DeviceParameter.pdf", "application/pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  //***************************************************************************************** */

  return (
    <Fragment>
      <Row className="mb-2">
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}
        <Col sm="auto">
          <label>Device Make</label>
          <Input
            placeholder="Make"
            value={deviceMake || ""}
            readOnly
            bsSize="sm"
          />
        </Col>
        <Col sm="auto">
          <label>Device Name</label>
          <Input
            placeholder="Name"
            value={deviceName || ""}
            readOnly
            bsSize="sm"
          />
        </Col>
        <Col sm="auto">
          <label>Device Model</label>
          <Input
            placeholder="Model"
            value={deviceModel || ""}
            readOnly
            bsSize="sm"
          />
        </Col>
        {isAddOptions && (
          <Col sm="auto">
            <Button
              type="button"
              color="success"
              className="btn-rounded mb-2 me-2"
              onClick={addNewParameter}
            >
              <i className="mdi mdi-plus me-1" />
              Add New Parameter
            </Button>
          </Col>
        )}
        <div className="text-end">
          <button onClick={downloadPdf} className="fs-4 border-0">
            <i class="bx bxs-download" title="download Pdf"></i>
          </button>
        </div>
      </Row>

      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td key={cell.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination size="sm">
          <PaginationItem disabled={!canPreviousPage}>
            <PaginationLink previous onClick={() => previousPage()} />
          </PaginationItem>
          {pageOptions.map((number) => (
            <PaginationItem active={number === pageIndex} key={number}>
              <PaginationLink onClick={() => gotoPage(number)}>
                {number + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={!canNextPage}>
            <PaginationLink next onClick={() => nextPage()} />
          </PaginationItem>
        </Pagination>
      </div>
    </Fragment>
  );
};

TableContainer.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  deviceMake: PropTypes.string,
  deviceModel: PropTypes.string,
  deviceName: PropTypes.string,
  isGlobalFilter: PropTypes.bool,
  isAddOptions: PropTypes.bool,
  handleOrderClicks: PropTypes.func,
  handleUserClick: PropTypes.func,
  handleCustomerClick: PropTypes.func,
  isAddCustList: PropTypes.bool,
  customPageSize: PropTypes.number,
  className: PropTypes.string,
  deviceId: PropTypes.string,
};

export default TableContainer;
