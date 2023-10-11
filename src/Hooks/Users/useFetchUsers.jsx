import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function useFetchUsers(pageNum) {
  const fetchUsers = (pageNum) => {
    return axiosInstance({
      method: "get",
      url: `/userprofiles/?page=${pageNum}`,
    });
  };
  return useQuery(["users", pageNum], () => fetchUsers(pageNum), {
    select: (data) => data.data.results,
  });
}
