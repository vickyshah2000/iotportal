import { post } from "../../api_helper";
import { SUBMIT_ANNOUNCEMENT } from "../../url_helper";

const submitAnnouncement = (props) => {
  const username2 = import.meta.env.VITE_USERNAME_2;
  const password2 = import.meta.env.VITE_PASSWORD_U_2;
  const credentials = window.btoa(`${username2}:${password2}`);

  const data = props;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
  };

  const response = post(SUBMIT_ANNOUNCEMENT, data, config);

  return response;
};

export default submitAnnouncement;
