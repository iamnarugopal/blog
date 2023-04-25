import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data.err)
);

export default Api;

// const Api = async (endpoint, method, body) => {
//   const options = {
//     url: process.env.REACT_APP_API_URL + endpoint,
//     method: method || "GET",
//     data: body,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "*",
//     },
//     withCredentials: true,
//     responseType: "json",
//   };

//   if (method === "GET") {
//     options.data = undefined;
//   }

//   //console.log("options=>>", options);

//   return axios(options)
//     .then((response) => {
//       //  console.log(`response from ${endpoint} >> ${response}`);
//       return response;
//     })
//     .catch((error) => {
//       console.log(`Error from ${endpoint} >> ${error}`);
//       throw error.response;
//     });
// };

// export default Api;
