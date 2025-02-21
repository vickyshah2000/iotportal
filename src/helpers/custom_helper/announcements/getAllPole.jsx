import { get } from "../api_helper";
import { GET_ANNOUNCEMENT_POLES } from "../../url_helper";
import Cookies from "js-cookie";

const getAllPole = async () => {
  const username2 = import.meta.env.VITE_USERNAME_2;
  const password2 = import.meta.env.VITE_PASSWORD_U_2;

  const credentials2 = window.btoa(`${username2}:${password2}`);

  const login_Id = Cookies.get("authUser")
    ? JSON.parse(Cookies.get("authUser")).LoginId
    : "";

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials2}`,
    },
  };

  const response = await get(GET_ANNOUNCEMENT_POLES, config);
  return response;
};

export default getAllPole;
