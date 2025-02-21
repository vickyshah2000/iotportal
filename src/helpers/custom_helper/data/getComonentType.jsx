import { get } from "../api_helper";
import { GET_COMPONENT_TYPE } from "../../url_helper";

const getComponents = (props) => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const credentials = window.btoa(`${username}:${password}`);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
  };
  const data = get(GET_COMPONENT_TYPE, config);
  return data;
};

export default getComponents;
