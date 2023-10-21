import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchPostLikes(post_id, group) {
  const fetchPostLikers = (post_id, group) => {
    return axiosInstance({
      method: "get",
      url:
        group === true
          ? `/group-posts/${post_id}/likes/`
          : `/posts/${post_id}/likes/`,
    });
  };
  return useQuery(["PostLikers", post_id], () => fetchPostLikers(post_id), {
    select: (data) => data.data,
  });
}
