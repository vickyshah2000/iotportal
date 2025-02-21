import { get } from "../api_helper";
import { GET_COMPONENTS_DETAILS } from "../../url_helper";

const getComponents = (props) => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const credentials = window.btoa(`${username}:${password}`);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    params: { PollPDId: props },
  };
  const data = get(GET_COMPONENTS_DETAILS, config);
  return data;
};

export default getComponents;
