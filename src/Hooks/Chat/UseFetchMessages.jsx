import { useQuery } from "react-query";
import { axiosInstance } from "./../../Axios/axiosInstance";

export default function UseFetchMessages(id) {
  const fetchMessages = (id) => {
    return axiosInstance({
      method: "get",
      url: `/chat/${id}`,
    });
  };
  return useQuery(["Messages", id], () => fetchMessages(id), {
    select: (data) => data.data,
  });
}
