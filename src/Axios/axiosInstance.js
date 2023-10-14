import axios from "axios";
import { toast } from "react-hot-toast";

const tokens = JSON.parse(localStorage.getItem("tokens"));

export const axiosInstance = axios.create({
  baseURL: "https://tulk.azurewebsites.net",
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
        url: "https://tulk.azurewebsites.net/api/token/refresh/",
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
          return axiosInstance(err.config), window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          if (
            err.response.status === 401 &&
            err.response.statusText === "Unauthorized"
          ) {
            toast.error("You need to login first!");
            localStorage.removeItem("user");
            localStorage.removeItem("tokens");
            return (window.location = `${window.location.origin}/login`);
          }
        });
    } else if (
      err.response.status === 401 &&
      err.response.statusText === "Unauthorized"
    ) {
      toast.error("You need to login first!");
      return (window.location = `${window.location.origin}/login`);
    }
  }
);
