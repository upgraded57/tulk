import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseSearchArticles({ search_query }) {
  const searchArticles = (search_query) => {
    return axiosInstance({
      method: "get",
      url: "/search/",
      params: {
        search: search_query,
        model: "articles",
      },
    });
  };
  return useQuery(
    ["searchArticles", search_query],
    () => searchArticles(search_query),
    {
      select: (data) => data.data.data,
    }
  );
}
