import { postFormData } from "../../api_helper";
import { SUBMIT_VMD_DETAILS } from "../../url_helper";
import Cookies from "js-cookie";

const submitVmdFiles = (values) => {
  const username = import.meta.env.VITE_USERNAME_2;
  const password = import.meta.env.VITE_PASSWORD_U_2;

  console.log(username, password);

  const credentials = window.btoa(`${username}:${password}`);

  const login_Id = Cookies.get("authUser")
    ? JSON.parse(Cookies.get("authUser")).LoginId
    : "";

  // console.log(values.audioFile.mozfullPath());
  const formData = new FormData();

  // formData.append("Input", { RecordingName: values.recordingName });
  formData.append(
    "Input",
    JSON.stringify({
      Vmid: values.Vmid,
      PollPDId: values.PollPDId,
      VMDId: values.VmdId,
      ContentTypeId: values.ContentTypeId,
      IsActive: values.IsActive,
      ContentText: values.ContentText,
      LoginId: login_Id,
    })
  );

  if (values.File !== null && values.File !== "") {
    formData.append("File1", values.File);
  }

  for (var [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Basic ${credentials}`,
      Accept: "application/json", // Example: Specify the type of response expected
    },
  };

  console.log();
  return postFormData(SUBMIT_VMD_DETAILS, formData, config);
};

export default submitVmdFiles;
