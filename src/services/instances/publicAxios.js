//نیازی به AUTH نداره
//get

import axios from "axios";
import { Base_URL } from "../../configs/constant";

const publicAxios = axios.create({
  baseURL: Base_URL,
});

publicAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

publicAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default publicAxios;
