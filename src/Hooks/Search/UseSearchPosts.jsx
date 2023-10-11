import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseSearchPosts(search_query) {
  const searchPosts = (search_query) => {
    return axiosInstance({
      method: "get",
      url: "/search/",
      params: {
        search: search_query,
        model: "posts",
      },
    });
  };
  return useQuery(
    ["searchPosts", search_query],
    () => searchPosts(search_query),
    {
      select: (data) => data.data.data,
    }
  );
}
