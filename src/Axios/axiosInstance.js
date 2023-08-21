import axios, { Axios } from "axios";

const tokens = JSON.parse(localStorage.getItem("tokens"));

export const axiosInstance = axios.create({
  baseURL: "https://tulk-social-f7f4f4c56190.herokuapp.com",
  headers: {
    Authorization: `Bearer ${tokens?.access}`,
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response.status &&
      err.response.statusText === "Unauthorized" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await axios({
        method: "post",
        url: "https://tulk-social-f7f4f4c56190.herokuapp.com/api/token/refresh/",
        data: { refresh: tokens.refresh },
      })
        .then((res) => {
          if (localStorage.getItem("tokens")) {
            localStorage.removeItem("tokens");
          }
          const access = res.data.access;
          const refresh = res.data.refresh;
          const tokens = { access, refresh };
          localStorage.setItem("tokens", JSON.stringify(tokens));
          err.config.headers["Authorization"] = "Bearer " + res.data.access;
          return axiosInstance(err.config);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (
      err.response.status &&
      err.response.statusText === "Token blacklisted"
    ) {
      window.location = `${window.location.origin}/login`;
    }
  }
);
