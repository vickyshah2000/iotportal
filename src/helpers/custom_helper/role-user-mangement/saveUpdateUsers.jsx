import { postComponent } from "../../api_helper";
import { SAVE_UPDATE_USERS } from "../../url_helper";
import Cookies from "js-cookie";

const saveUpdateRoles = (props) => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const Ccode = Cookies.get("authUser")
    ? JSON.parse(Cookies.get("authUser")).CCode
    : "";

  const credentials = window.btoa(`${username}:${password}`);

  const data = {
    JArrayval: JSON.stringify(props.options),
    IsActive: props.IsActive,
    FullName: props.FullName,
    EmailId: props.EmailId,
    UserId: props.UserId,
    Pwd: props.Password,
    Mobile: props.Mobile,
    CCode: Ccode,
    EmpCode: "",
    RoleId: props.RoleId,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
  };

  console.log(props);

  return postComponent(SAVE_UPDATE_USERS, JSON.stringify(data), config);
};

export default saveUpdateRoles;
