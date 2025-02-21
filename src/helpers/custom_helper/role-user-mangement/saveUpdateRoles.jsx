import { postComponent } from "../../api_helper";
import { SAVE_UPDATE_ROLES } from "../../url_helper";

const saveUpdateRoles = (props) => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const credentials = window.btoa(`${username}:${password}`);

  const data = {
    JArrayval: JSON.stringify(props.options),
    RoleName: props.RoleName,
    CCode: props.CCode,
    IsActive: props.IsActive,
    RoleId: props.RoleId,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
  };

  return postComponent(SAVE_UPDATE_ROLES, JSON.stringify(data), config);
};

export default saveUpdateRoles;
