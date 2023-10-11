import React from "react";
import { axiosInstance } from "../../Axios/axiosInstance";
import { useQuery } from "react-query";

export default function UseFetchChats() {
  const fetchChats = () => {
    return axiosInstance({
      method: "get",
      url: "/chat",
    });
  };
  return useQuery("fetchChat", fetchChats, {
    select: (data) => data.data.results,
  });
}
