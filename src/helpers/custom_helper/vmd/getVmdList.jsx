import { post } from "../api_helper";
import { GET_VMD_LIST } from "../../url_helper";
import Cookies from "js-cookie";

const getVmdList = ({
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
    SearchText,
    SortColumn,
    SortOrder,
    PageNumber,
    PageSize,
    NotiType,
    LoginId: login_Id,
  };

  console.log(requestBody);

  return post(GET_VMD_LIST, requestBody, config);
};

export default getVmdList;
