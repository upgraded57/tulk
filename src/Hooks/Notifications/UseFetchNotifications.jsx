import React from "react";
import { axiosInstance } from "../../Axios/axiosInstance";
import { useQuery } from "react-query";

export default function UseFetchNotifications() {
  const fetchNotifications = () => {
    return axiosInstance({
      method: "get",
      url: `https://tulk.azurewebsites.net/notifications/?page=1`,
    });
  };
  return useQuery("Notifications", fetchNotifications, {
    select: (data) => data.data.results,
  });
}
