import { get } from "../api_helper";
import { GET_ROLES } from "../../url_helper";
import Cookies from "js-cookie";

const getRoles = () => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const credentials = window.btoa(`${username}:${password}`);

  const Ccode = Cookies.get("authUser")
    ? JSON.parse(Cookies.get("authUser")).CCode
    : "";

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    params: { CCode: Ccode },
  };

  const data = get(GET_ROLES, config);
  return data;
};

export default getRoles;
