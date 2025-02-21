import { fetchWithTokenRefresh } from "../../AuthType/backend";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_BASE_URL;
const baseUrl2 = import.meta.env.VITE_BASE_URL2;
const baseUrl4 = import.meta.env.VITE_BASE_URL4;

// const entityId = JSON.parse(Cookies.get("authUser")).entity_id.entity_id;
const Role = Cookies.get("authUser")
  ? JSON.parse(Cookies.get("authUser")).entity_id.entity_id
  : "";

// const entityId = 0;

const urlTotalDevices = `${baseUrl4}/api/Device/device-count?entityId=`;
const urlActiveDevices = `${baseUrl4}/api/Device/device-count?entityId=`;
const urlInactiveDevices = `${baseUrl4}/api/Device/device-count?entityId=`;
const urlTotalTickets = `${baseUrl}/api/all-tickets/`;
const urlTotalTicketsSystem = `${baseUrl}/api/all-tickets-system/`;
const urlOpenTickets = `${baseUrl}/api/all-opened-tickets/`;
const urlOpenTicketsSystem = `${baseUrl}/api/all-opened-tickets-system/`;
const urlCloseTickets = `${baseUrl}/api/all-closed-tickets/`;
const urlCloseTicketsSystem = `${baseUrl}/api/all-closed-tickets-system/`;
const urlCompliant = `${baseUrl}/api/compliant-device/`;
const urlCompliantZonal = `${baseUrl}/api/region-compliant-device/`;

export const getTotalDevice = async (entityId) => {
  const response = await fetchWithTokenRefresh({
    url: `${urlTotalDevices}${entityId}`,
  });

  return response.data;
};
export const getActiveDevice = async (entityId) => {
  const response = await fetchWithTokenRefresh({
    url: `${urlActiveDevices}${entityId}`,
  });
  return response.data;
};
export const getInactiveDevice = async (entityId) => {
  const response = await fetchWithTokenRefresh({
    url: `${urlInactiveDevices}${entityId}`,
  });
  return response.data;
};
export const getTotalTicket = async (entityId) => {
  let response;
  if (Role == "Admin") {
    response = await fetchWithTokenRefresh({
      url: `${urlTotalTickets}${entityId}/`,
    });
  } else if (entityId == "2") {
    response = await fetchWithTokenRefresh({
      url: `${urlTotalTicketsSystem}${entityId}/`,
    });
  } else {
    response = await fetchWithTokenRefresh({
      url: `${urlTotalTicketsSystem}3/`,
    });
  }
  return response.data;
};
export const getOpenTicket = async (entityId) => {
  let response;
  if (Role == "Admin") {
    response = await fetchWithTokenRefresh({
      url: `${urlOpenTickets}${entityId}/`,
    });
  } else if (entityId == "2") {
    response = await fetchWithTokenRefresh({
      url: `${urlOpenTicketsSystem}${entityId}/`,
    });
  } else {
    response = await fetchWithTokenRefresh({
      url: `${urlOpenTickets}3/`,
    });
  }
  return response.data;
};
export const getClosedTicket = async (entityId) => {
  let response;
  if (Role == "Admin") {
    response = await fetchWithTokenRefresh({
      url: `${urlCloseTickets}${entityId}/`,
    });
  } else if (entityId == "2") {
    response = await fetchWithTokenRefresh({
      url: `${urlCloseTicketsSystem}${entityId}/`,
    });
  } else {
    response = await fetchWithTokenRefresh({
      url: `${urlCloseTickets}3/`,
    });
  }
  return response.data;
};
export const getCompliance = async (entityId) => {
  const response = await fetchWithTokenRefresh({
    url: `${urlCompliant}${entityId}/`,
  });
  return response.data;
};
export const getComplianceByZone = async (entityId, zone) => {
  const response = await fetchWithTokenRefresh({
    url: `${urlCompliantZonal}${zone}/${entityId}/`,
  });
  return response.data;
};
