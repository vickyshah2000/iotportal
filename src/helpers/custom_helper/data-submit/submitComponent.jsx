import { postComponent } from "../../api_helper";
import { POST_COMPONENT_DETAILS } from "../../url_helper";

const submitComponent = (props) => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const credentials = window.btoa(`${username}:${password}`);

  const data = props;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
  };

  return postComponent(POST_COMPONENT_DETAILS, data, config);
};

export default submitComponent;
