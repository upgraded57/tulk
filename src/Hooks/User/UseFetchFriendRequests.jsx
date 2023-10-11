import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchFriendRequests(pageNum) {
  const fetchUserFriendRequests = (pageNum) => {
    return axiosInstance({
      method: "get",
      url: `/friend-requests/?page=${pageNum}`,
    });
  };
  return useQuery(
    ["friendRequests", pageNum],
    () => fetchUserFriendRequests(pageNum),
    {
      select: (data) => data.data.results,
    }
  );
}
