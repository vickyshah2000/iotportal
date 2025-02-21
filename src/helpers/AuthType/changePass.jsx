import axios from "axios";

const changePass = (props) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const post = (url, data) =>
    axios
      .post(url, data, config)
      .then((response) => {
        // Handle the response
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = { email: props };

  return post(`${baseUrl}api/password-reset/`, data);
};

export default changePass;
