import { post } from "../api_helper";
import { GET_POLE_DETAILS } from "../../url_helper";
import Cookies from "js-cookie";

const getPole = ({
  PageSize,
  PageNumber,
  SortOrder,
  SortColumn,
  SearchText,
  NotiType,
}) => {
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
  const requestBody = {
    PageSize,
    PageNumber,
    SortOrder,
    SearchText,
    SortColumn,
    NotiType: NotiType,
    LoginId: login_Id,
  };

  return post(GET_POLE_DETAILS, requestBody, config);
};

export default getPole;
