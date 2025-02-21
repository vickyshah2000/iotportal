import { useDispatch } from "react-redux";
import { post, get } from "../custom_helper/api_helper";
import { POST_FAKE_LOGIN, GET_POLE_DETAILS } from "../url_helper";
import { apiError } from "../../store/actions";
import Cookies from "js-cookie";
import axios from "axios";
import { options } from "toastr";

const userCookie = Cookies.get("authUser");
const userDetails = userCookie ? JSON.parse(userCookie) : null;

const backend = async (user) => {
  const { email, password } = user;

  // const username1 = import.meta.env.VITE_USERNAME;
  // const password1 = import.meta.env.VITE_PASSWORD_U;

  // const credentials = window.btoa(`${username1}:${password1}`);

  const loginRequestBody = {
    username: email,
    password: password,
  };

  // const basicAuthConfig = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Basic ${credentials}`,
  //   },
  // };

  try {
    const loginResponse = await post(
      `${import.meta.env.VITE_BASE_URL3}/api/Auth/login`,
      loginRequestBody
      // basicAuthConfig
    );
    return loginResponse;
    // if (loginResponse.msg === "login successful") {
    //   // const { access, refresh } = loginResponse;
    //   return loginResponse;
    // } else {
    //   return { message: "Wrong Credentials" };
    // }
  } catch (error) {
    return error;
  }
};

// const fetchWithTokenRefresh = async ({ url, options = {}, body }) => {
//   const userCookie = Cookies.get("authUser");
//   const userDetails = userCookie ? JSON.parse(userCookie) : null;
//   let accessToken = userDetails?.access;

//   if (!accessToken) {
//     throw new Error("No access token found");
//   }

//   const config = {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: body,
//   };

//   try {
//     const response = await axios.get(url, config);
//     return response;
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       const refreshToken = userDetails?.refresh;
//       if (!refreshToken) {
//         throw new Error("No refresh token found");
//       }

//       try {
//         const refreshResponse = await axios.post(
//           `${import.meta.env.VITE_BASE_URL3}/api/Auth/login`,
//           { refresh: refreshToken }
//         );

//         const { access: newAccessToken } = refreshResponse.data;
//         userDetails.access = newAccessToken;
//         Cookies.set("authUser", JSON.stringify(userDetails));

//         const retryConfig = {
//           ...options,
//           headers: {
//             ...options.headers,
//             Authorization: `Bearer ${newAccessToken}`,
//           },
//         };

//         return await axios.get(url, retryConfig);
//       } catch (refreshError) {
//         throw new Error("Failed to refresh token");
//       }
//     } else {
//       throw error;
//     }
//   }
// };
const fetchWithTokenRefresh = async ({ url, options = {}, body }) => {
  const userCookie = Cookies.get("authUser");
  const userDetails = userCookie ? JSON.parse(userCookie) : null;
  let accessToken = userDetails?.access;

  if (!accessToken) {
    throw new Error("No access token found");
  }

  const config = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    body: body,
  };

  try {
    const response = await axios.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
};

// const postWithTokenRefresh = async ({ url, options = {}, body }) => {
//   const userCookie = Cookies.get("authUser");
//   const userDetails = userCookie ? JSON.parse(userCookie) : null;
//   let accessToken = userDetails?.access;

//   if (!accessToken) {
//     throw new Error("No access token found");
//   }

//   const config = {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };

//   try {
//     const response = await axios.post(url, body, config);
//     return response;
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       const refreshToken = userDetails?.refresh;
//       if (!refreshToken) {
//         throw new Error("No refresh token found");
//       }

//       try {
//         const refreshResponse = await axios.post(
//           `${import.meta.env.VITE_BASE_URL3}/api/Auth/login`,
//           { refresh: refreshToken }
//         );

//         const { access: newAccessToken } = refreshResponse.data;
//         userDetails.access = newAccessToken;
//         Cookies.set("authUser", JSON.stringify(userDetails));

//         const retryConfig = {
//           ...options,
//           headers: {
//             ...options.headers,
//             Authorization: `Bearer ${newAccessToken}`,
//           },
//         };

//         return await axios.post(url, body, retryConfig);
//       } catch (refreshError) {
//         throw new Error("Failed to refresh token");
//       }
//     } else {
//       throw error;
//     }
//   }
// };
const postWithTokenRefresh = async ({ url, options = {}, body }) => {
  const userCookie = Cookies.get("authUser");
  const userDetails = userCookie ? JSON.parse(userCookie) : null;
  let accessToken = userDetails?.access;

  if (!accessToken) {
    throw new Error("No access token found");
  }

  const config = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.post(url, body, config);
    return response;
  } catch (error) {
    throw error;
  }
};

// const putWithTokenRefresh = async ({ url, options = {}, body }) => {
//   const userCookie = Cookies.get("authUser");
//   const userDetails = userCookie ? JSON.parse(userCookie) : null;
//   let accessToken = userDetails?.access;

//   if (!accessToken) {
//     throw new Error("No access token found");
//   }

//   const config = {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };

//   try {
//     const response = await axios.put(url, body, config);
//     return response;
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       const refreshToken = userDetails?.refresh;
//       if (!refreshToken) {
//         throw new Error("No refresh token found");
//       }

//       try {
//         const refreshResponse = await axios.post(
//           `${import.meta.env.VITE_BASE_URL3}/api/Auth/login`,
//           { refresh: refreshToken }
//         );

//         const { access: newAccessToken } = refreshResponse.data;
//         userDetails.access = newAccessToken;
//         Cookies.set("authUser", JSON.stringify(userDetails));

//         const retryConfig = {
//           ...options,
//           headers: {
//             ...options.headers,
//             Authorization: `Bearer ${newAccessToken}`,
//           },
//         };

//         return await axios.put(url, body, retryConfig);
//       } catch (refreshError) {
//         throw new Error("Failed to refresh token");
//       }
//     } else {
//       throw error;
//     }
//   }
// };
const putWithTokenRefresh = async ({ url, options = {}, body }) => {
  const userCookie = Cookies.get("authUser");
  const userDetails = userCookie ? JSON.parse(userCookie) : null;
  let accessToken = userDetails?.access;

  if (!accessToken) {
    throw new Error("No access token found");
  }

  const config = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.put(url, body, config);
    return response;
  } catch (error) {
    throw error;
  }
};


const fetchPoleDetails = async () => {
  try {
    const response = await fetchWithTokenRefresh(GET_POLE_DETAILS, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default backend;
export { fetchPoleDetails, fetchWithTokenRefresh, postWithTokenRefresh, putWithTokenRefresh };


// import { useDispatch } from "react-redux";
// import { post, get } from "../custom_helper/api_helper";
// import { POST_FAKE_LOGIN, GET_POLE_DETAILS } from "../url_helper";
// import { apiError } from "../../store/actions";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { options } from "toastr";

// const userCookie = Cookies.get("authUser");
// const userDetails = userCookie ? JSON.parse(userCookie) : null;

// const backend = async (user) => {
//   const { email, password } = user;

//   const username1 = import.meta.env.VITE_USERNAME;
//   const password1 = import.meta.env.VITE_PASSWORD_U;

//   const credentials = window.btoa(`${username1}:${password1}`);

//   const loginRequestBody = {
//     username: email,
//     password: password,
//   };

//   const basicAuthConfig = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Basic ${credentials}`,
//     },
//   };

//   try {
//     const loginResponse = await post(
//       `${import.meta.env.VITE_BASE_URL}/api/token/`,
//       loginRequestBody
//       // basicAuthConfig
//     );
//     if (loginResponse.msg === "login successful") {
//       // const { access, refresh } = loginResponse;
//       return loginResponse;
//     } else {
//       return { message: "Wrong Credentials" };
//     }
//   } catch (error) {
//     return error;
//   }
// };

// const fetchWithTokenRefresh = async ({ url, options = {}, body }) => {
//   const userCookie = Cookies.get("authUser");
//   const userDetails = userCookie ? JSON.parse(userCookie) : null;
//   let accessToken = userDetails?.access;

//   if (!accessToken) {
//     throw new Error("No access token found");
//   }

//   const config = {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: body,
//   };

//   try {
//     const response = await axios.get(url, config);
//     return response;
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       const refreshToken = userDetails?.refresh;
//       if (!refreshToken) {
//         throw new Error("No refresh token found");
//       }

//       try {
//         const refreshResponse = await axios.post(
//           `${import.meta.env.VITE_BASE_URL}/api/token/refresh/`,
//           { refresh: refreshToken }
//         );

//         const { access: newAccessToken } = refreshResponse.data;
//         userDetails.access = newAccessToken;
//         Cookies.set("authUser", JSON.stringify(userDetails));

//         const retryConfig = {
//           ...options,
//           headers: {
//             ...options.headers,
//             Authorization: `Bearer ${newAccessToken}`,
//           },
//         };

//         return await axios.get(url, retryConfig);
//       } catch (refreshError) {
//         throw new Error("Failed to refresh token");
//       }
//     } else {
//       throw error;
//     }
//   }
// };

// const postWithTokenRefresh = async ({ url, options = {}, body }) => {
//   const userCookie = Cookies.get("authUser");
//   const userDetails = userCookie ? JSON.parse(userCookie) : null;
//   let accessToken = userDetails?.access;

//   if (!accessToken) {
//     throw new Error("No access token found");
//   }

//   const config = {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };

//   try {
//     const response = await axios.post(url, body, config);
//     return response;
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       const refreshToken = userDetails?.refresh;
//       if (!refreshToken) {
//         throw new Error("No refresh token found");
//       }

//       try {
//         const refreshResponse = await axios.post(
//           `${import.meta.env.VITE_BASE_URL}/api/token/refresh/`,
//           { refresh: refreshToken }
//         );

//         const { access: newAccessToken } = refreshResponse.data;
//         userDetails.access = newAccessToken;
//         Cookies.set("authUser", JSON.stringify(userDetails));

//         const retryConfig = {
//           ...options,
//           headers: {
//             ...options.headers,
//             Authorization: `Bearer ${newAccessToken}`,
//           },
//         };

//         return await axios.post(url, body, retryConfig);
//       } catch (refreshError) {
//         throw new Error("Failed to refresh token");
//       }
//     } else {
//       throw error;
//     }
//   }
// };

// const putWithTokenRefresh = async ({ url, options = {}, body }) => {
//   const userCookie = Cookies.get("authUser");
//   const userDetails = userCookie ? JSON.parse(userCookie) : null;
//   let accessToken = userDetails?.access;

//   if (!accessToken) {
//     throw new Error("No access token found");
//   }

//   const config = {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };

//   try {
//     const response = await axios.put(url, body, config);
//     return response;
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       const refreshToken = userDetails?.refresh;
//       if (!refreshToken) {
//         throw new Error("No refresh token found");
//       }

//       try {
//         const refreshResponse = await axios.post(
//           `${import.meta.env.VITE_BASE_URL}/api/token/refresh/`,
//           { refresh: refreshToken }
//         );

//         const { access: newAccessToken } = refreshResponse.data;
//         userDetails.access = newAccessToken;
//         Cookies.set("authUser", JSON.stringify(userDetails));

//         const retryConfig = {
//           ...options,
//           headers: {
//             ...options.headers,
//             Authorization: `Bearer ${newAccessToken}`,
//           },
//         };

//         return await axios.put(url, body, retryConfig);
//       } catch (refreshError) {
//         throw new Error("Failed to refresh token");
//       }
//     } else {
//       throw error;
//     }
//   }
// };

// const fetchPoleDetails = async () => {
//   try {
//     const response = await fetchWithTokenRefresh(GET_POLE_DETAILS, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export default backend;
// export { fetchPoleDetails, fetchWithTokenRefresh, postWithTokenRefresh, putWithTokenRefresh };
