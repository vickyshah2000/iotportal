import { post } from "../../api_helper";
import { GET_USERS_LIST } from "../../url_helper";
import Cookies from "js-cookie";

const getUsers = ({
  PageSize,
  PageNumber,
  SortOrder,
  SortColumn,
  SearchText,
}) => {
  const username2 = import.meta.env.VITE_USERNAME_2;
  const password2 = import.meta.env.VITE_PASSWORD_U_2;

  const credentials2 = window.btoa(`${username2}:${password2}`);

  const CCode = Cookies.get("authUser")
    ? JSON.parse(Cookies.get("authUser")).CCode
    : "";

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials2}`,
    },
  };
  const requestBody = {
    search: {
      value: SearchText,
    },
    start: PageNumber,
    length: PageSize,
    order: [
      {
        dir: SortOrder,
        column: SortColumn,
      },
    ],
    CCode: CCode,
  };

  return post(GET_USERS_LIST, requestBody, config);
};

export default getUsers;
