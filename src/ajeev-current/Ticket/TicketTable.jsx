import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

// Import components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "./TableContainer";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";
import Cookies from "js-cookie";
import { time } from "echarts";

/**
 * ContactTable component fetches contact data from API and renders a table.
 */
function TicketTable(props) {
  // const base_url = import.meta.env.VITE_BASE_URL_TICKET;
  const base_url = import.meta.env.VITE_BASE_URL;
  const history = useHistory();
  const { Status } = props.location.state;

  const EntityId = JSON.parse(Cookies.get("authUser")).entity_id.entity_id;
  const Role = JSON.parse(Cookies.get("authUser")).role;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Role == "Admin") {
          const response = await fetchWithTokenRefresh({
            url: `${base_url}/api/all-ticket-details-system/`,
          });
          console.log(response.data);
          setData(response.data);
          setLoading(false);
        } else {
          if (EntityId == "1") {
            const response = await fetchWithTokenRefresh({
              url: `${base_url}/api/all-ticket-details-system/5/`,
            });
            if (Status === "All") {
              setData(response.data);
              console.log(response.data)
            } else if (Status === "Open") {
              const openTickets = response.data.filter(
                (ticket) => ticket.TicketCondition === "OpenTicket"
              );
              console.log(openTickets);
              setData(openTickets);
            } else {
              const closedTickets = response.data.filter(
                (ticket) => ticket.TicketCondition === "ClosedTicket"
              );
              console.log(closedTickets);
              setData(closedTickets);
            }

            setLoading(false);
          } else {
            const response = await fetchWithTokenRefresh({
              url: `${base_url}/api/all-ticket-details/1/`,
            });
            console.log(response.data);
            if (Status === "All") {
              setData(response.data);
            } else if (Status === "Open") {
              const openTickets = data.filter(
                (ticket) => ticket.TicketCondition === "OpenTicket"
              );
              setData(openTickets);
            } else {
              const closedTickets = data.filter(
                (ticket) => ticket.TicketCondition === "ClosedTicket"
              );
              setData(closedTickets);
            }

            setLoading(false); // Set loading to false when data is fetched
          }
        }
      } catch (error) {
        setError(error); // Set error if there's an error in fetching data
        setLoading(false); // Set loading to false if there's an error
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [base_url]);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      {
        Header: "Name",
        accessor: "Name",
        disableFilters: true,
      },
      {
        Header: "Ticket Title",
        accessor: "Title",
        disableFilters: true,
      },
      {
        Header: "ASM",
        accessor: "ASM",
        disableFilters: true,
      },
      {
        Header: "SO",
        accessor: "SO",
        disableFilters: true,
      },
      {
        Header: "Short Name",
        accessor: "ShortName",
        disableFilters: true,
      },
      {
        Header: "New Description",
        accessor: "NewDescription",
        disableFilters: true,
      },
      {
        Header: "City",
        accessor: "cityname",
        disableFilters: true,
      },
      {
        Header: "Region",
        accessor: "regionname",
        disableFilters: true,
      },
      {
        Header: "Zone",
        accessor: "zonename",
        disableFilters: true,
      },
      {
        Header: "Status",
        accessor: "Status",
        disableFilters: true,
      },
      {
        Header: "Ticket Condition",
        accessor: "TicketCondition",
        disableFilters: true,
      },
      {
        Header: "Create Date",
        accessor: "created_on",
        disableFilters: true,
      },
      {
        Header: "Install Device",
        accessor: "InstallDate",
        disableFilters: true,
        Cell: ({ value }) => {
          // Format the date and time here
          const formattedDateTime = new Date(value).toLocaleString([], {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });
          return <span>{formattedDateTime}</span>;
        },
      }
      
      
    ],
    []
  );

  document.title = "Person Details";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs
          title={
            Status === "All" ? "All" : Status === "Open" ? "Open" : "Closed"
          }
          breadcrumbItem="Ticket Tables"
        />
        {/* Conditionally render table container with table header */}
        <TableContainer
          columns={columns}
          data={data || []} // Ensure data is always an array
          isGlobalFilter={true}
          isAddOptions={Role === "Customer"}
          customPageSize={10}
          className="custom-header-css"
        />
        {/* Conditionally render loading or error messages */}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
}

// Prop types validation
TicketTable.propTypes = {
  preGlobalFilteredRows: PropTypes.array,
};

export default TicketTable;
