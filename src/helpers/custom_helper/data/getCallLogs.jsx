import { post } from "../api_helper";
import { GET_CALL_LOG } from "../../url_helper";
import Cookies from "js-cookie";

const getCallLogs = ({
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
    NotiType,
    LoginId: login_Id,
    FromDate: "2024-04-01",
    ToDate: "2024-04-11",
  };

  console.log(requestBody);

  return post(GET_CALL_LOG, requestBody, config);
};

export default getCallLogs;
