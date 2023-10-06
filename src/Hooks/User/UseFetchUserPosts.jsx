import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchUserPosts({ user_id }) {
  const fetchUserPosts = (user_id) => {
    return axiosInstance({
      url: `/users/${user_id}/posts/`,
      method: "get",
    });
  };
  return useQuery(["userPosts", user_id], () => fetchUserPosts(user_id));
}
