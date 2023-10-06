import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchPosts({ pageNum }) {
  const fetchPosts = () => {
    return axiosInstance({
      url: `/posts/?page=${pageNum}`,
      method: "get",
    });
  };
  return useQuery(["posts", pageNum], () => fetchPosts(pageNum), {
    select: (data) => data.data.results,
  });
}
