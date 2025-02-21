import { postFormData } from "../../api_helper";
import { ADD_RECORDING } from "../../url_helper";

const submitRecording = (values) => {
  const username = import.meta.env.VITE_USERNAME_2;
  const password = import.meta.env.VITE_PASSWORD_U_2;

  const credentials = window.btoa(`${username}:${password}`);

  // console.log(values.audioFile.mozfullPath());
  const formData = new FormData();

  // formData.append("Input", { RecordingName: values.recordingName });
  formData.append(
    "Input",
    JSON.stringify({ RecordingName: values.recordingName })
  );

  formData.append("File1", values.audioFile);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Basic ${credentials}`,
      Accept: "application/json", // Example: Specify the type of response expected
    },
  };

  return postFormData(ADD_RECORDING, formData, config);
};

export default submitRecording;
