import { get } from "../api_helper";
import { GET_USER_DETAILS } from "../../url_helper";
import Cookies from "js-cookie";

const getUserbyId = (props) => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const credentials = window.btoa(`${username}:${password}`);

  const UserId = props;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    params: { UserId: UserId },
  };

  const data = get(GET_USER_DETAILS, config);

  return data;
};

export default getUserbyId;
