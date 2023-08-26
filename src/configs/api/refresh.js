import privateAxios from "../../services/instances/privateAxios";

export const refreshToken = (token) => {
  return privateAxios
    .post("http://localhost:8000/api/auth/token", {
      refreshToken: token,
    })
    .then((res) => res.data);
};
