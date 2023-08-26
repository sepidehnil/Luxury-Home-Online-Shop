import axios from "axios";
import { Base_URL } from "../../configs/constant";

//به auth نیاز داره
//delete , post
const privateAxios = axios.create({
  baseURL: Base_URL,
});
privateAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default privateAxios;
