import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchUserGroups() {
  const fetchUserGroups = () => {
    return axiosInstance({
      method: "get",
      url: `/user-groups/`,
    });
  };
  return useQuery("userGroups", fetchUserGroups, {
    select: (data) => data.data.results,
  });
}
