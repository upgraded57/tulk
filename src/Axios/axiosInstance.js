import axios from "axios";
import { toast } from "react-hot-toast";

export const axiosInstance = axios.create({
  baseURL: "https://tulk.azurewebsites.net",
});

axiosInstance.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  config.headers.Authorization = `Bearer ${tokens.access}`;
  return config;
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
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      originalRequest._retry = true;
      await axios({
        method: "post",
        url: "https://tulk.azurewebsites.net/api/token/refresh/",
        data: { refresh: tokens.refresh },
      })
        .then((res) => {
          const access = res.data.access;
          const refresh = res.data.refresh;
          const tokens = { access, refresh };
          localStorage.setItem("tokens", JSON.stringify(tokens));
          err.config.headers.Authorization = "Bearer " + res.data.access;
          return axiosInstance(err.config);
        })
        .catch((err) => {
          console.log(err);
          if (
            err.response.status === 401 &&
            err.response.statusText === "Unauthorized"
          ) {
            window.location.reload();
          }
        });
    } else if (
      err.response.status === 401 &&
      err.response.statusText === "Unauthorized" &&
      err.response.detail === "Token is blacklisted"
    ) {
      console.log(err);
      toast.error("Your session expired. Please login!");
      return (window.location = `${window.location.origin}/login`);
    } else {
      return err;
    }
  }
);
