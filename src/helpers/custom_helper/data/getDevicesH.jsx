import { post } from "../api_helper";
import { GET_DEVICES_H } from "../../url_helper";
import Cookies from "js-cookie";

const getDevicesH = () => {
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
  };
  const body = { LoginId: login_Id };

  const data = post(GET_DEVICES_H, body, config);
  console.log(data);
  return data;
};

export default getDevicesH;
