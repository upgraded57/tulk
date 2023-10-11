import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";
export default function UseFetchUserFriends(user_id) {
  const fetchFriends = (user_id) => {
    return axiosInstance({
      method: "get",
      url: `/friendships/${user_id}`,
    });
  };
  return useQuery(["friendship", user_id], () => fetchFriends(user_id), {
    select: (data) => data.data,
  });
}
