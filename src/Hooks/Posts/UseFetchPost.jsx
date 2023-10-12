import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchPost(post_id) {
  const fetchPost = (post_id) => {
    return axiosInstance({
      method: "get",
      url: `/posts/${post_id}/`,
    });
  };
  return useQuery(["fetchPost", post_id], () => fetchPost(post_id), {
    select: (data) => data.data,
  });
}
