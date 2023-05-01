import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

Api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data.err)
);

export default Api;
