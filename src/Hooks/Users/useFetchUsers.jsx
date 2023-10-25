import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function useFetchUsers() {
  const fetchUsers = () => {
    return axiosInstance({
      method: "get",
      url: `/userprofiles/`,
    });
  };
  return useQuery("users", fetchUsers, {
    select: (data) => data.data,
  });
}
