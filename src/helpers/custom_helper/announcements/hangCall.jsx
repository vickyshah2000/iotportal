import { get } from "../api_helper";
import { HANG_CALL } from "../../url_helper";
import Cookies from "js-cookie";

const hangCall = async () => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const credentials2 = window.btoa(`${username}:${password}`);

  const login_Id = Cookies.get("authUser")
    ? JSON.parse(Cookies.get("authUser")).LoginId
    : "";

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials2}`,
    },
  };

  const response = await get(HANG_CALL, config);
  return response;
};

export default hangCall;
