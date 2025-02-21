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

  const data = {
    uidb64: props.uidb64,
    token: props.token,
    new_password: props.new_password,
  };

  return post(`${baseUrl}api/password-reset-confirm/`, data);
};

export default changePass;
