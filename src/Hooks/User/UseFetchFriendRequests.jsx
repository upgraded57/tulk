import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchFriendRequests() {
  const fetchUserFriendRequests = () => {
    return axiosInstance({
      method: "get",
      url: `/friend-requests/`,
    });
  };
  return useQuery("friendRequests", fetchUserFriendRequests, {
    select: (data) => data.data,
  });
}
