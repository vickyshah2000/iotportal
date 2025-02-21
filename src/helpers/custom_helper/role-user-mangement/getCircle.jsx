import { post } from "../api_helper";
import { GET_CIRCLE_MENU } from "../../url_helper";
import Cookies from "js-cookie";

const getCircleMenu = (props) => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const credentials = window.btoa(`${username}:${password}`);

  const Ccode = Cookies.get("authUser")
    ? JSON.parse(Cookies.get("authUser")).CCode
    : "";

  // const LoginId = Cookies.get("authUser")
  //   ? JSON.parse(Cookies.get("authUser")).LoginId
  //   : "";

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
  };

  const requestBody = {
    Ccode: Ccode,
    LoginId: props ? props : "",
  };

  const data = post(GET_CIRCLE_MENU, requestBody, config);

  return data;
};

export default getCircleMenu;
