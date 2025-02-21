import { get } from "../api_helper";
import { GET_DEVICES } from "../../url_helper";
import Cookies from "js-cookie";

const getDevices = () => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const credentials = window.btoa(`${username}:${password}`);

  const login_Id = Cookies.get("authUser")
    ? JSON.parse(Cookies.get("authUser")).LoginId
    : "";

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    params: { LoginId: login_Id },
  };

  const data = get(GET_DEVICES, config);

  return data;
};

export default getDevices;
