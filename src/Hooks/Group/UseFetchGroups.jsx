import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchGroups() {
  const fetchGroups = () => {
    return axiosInstance({
      url: "/groups/",
      method: "get",
    });
  };
  return useQuery("groups", fetchGroups, {
    select: (data) => data.data.results,
  });
}
