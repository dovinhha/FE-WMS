// import axiosClient from "./axiosClient";

const {axiosClient} = require("./axiosClient");
export const GET = (url, params) => {
  return axiosClient.get(url, params);
};

export const POST = (url, body) => {
  return axiosClient.post(url, body);
};

export const PATCH = (url, body) => {
  return axiosClient.patch(url, body);
};

export const DELETE = (url, params) => {
  return axiosClient.delete(url, params);
};

export default { GET, POST, PATCH, DELETE };
