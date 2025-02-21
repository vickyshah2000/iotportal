import { get } from "../api_helper";
import { GET_ROLE_MENU } from "../../url_helper";
import Cookies from "js-cookie";

const getRoleMenu = (props) => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const credentials = window.btoa(`${username}:${password}`);

  const roleId = props;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    params: { roleId: roleId },
  };

  const data = get(GET_ROLE_MENU, config);
  return data;
};

export default getRoleMenu;
