import { post } from "../../api_helper";
import { POST_POLE_DETAILS } from "../../url_helper";

const submitPole = (props) => {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD_U;

  const credentials = window.btoa(`${username}:${password}`);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
  };

  return post(POST_POLE_DETAILS, props, config);
};

export default submitPole;
