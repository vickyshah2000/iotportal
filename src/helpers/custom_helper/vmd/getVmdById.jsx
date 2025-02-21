import { get } from "../api_helper";
import { GET_VMD_LIST_BY_ID } from "../../url_helper";
import Cookies from "js-cookie";

const getVmdListById = (props) => {
  const username2 = import.meta.env.VITE_USERNAME_2;
  const password2 = import.meta.env.VITE_PASSWORD_U_2;

  const credentials2 = window.btoa(`${username2}:${password2}`);

  const login_Id = Cookies.get("authUser")
    ? JSON.parse(Cookies.get("authUser")).LoginId
    : "";
  console.log(props);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials2}`,
    },
    params: {
      VmId: props,
    },
  };

  return get(GET_VMD_LIST_BY_ID, config);
};

export default getVmdListById;
