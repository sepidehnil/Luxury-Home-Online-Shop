import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "../../configs/api/refresh.js";
import { BASE_URL } from "../../configs/constant.js";

const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalConfig = error.config;

    console.log(originalConfig);
    if (error.response) {
      // 401
      if (error.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const currentRefreshToken = Cookies.get("refreshToken");
        const res = await refreshToken(currentRefreshToken);
        const accessToken = res.token.accessToken;
        if (accessToken) {
          Cookies.set("accessToken", accessToken);
          return Promise.reject(error);
        }
      }
    }
  }
);

export default privateAxios;
