import { useQuery } from "react-query";
import { axiosInstance } from "./../../Axios/axiosInstance";

export default function UseFetchArticles() {
  const fetchArticles = () => {
    return axiosInstance({
      method: "get",
      url: "https://tulk-social.azurewebsites.net/editor/articles/",
    });
  };
  return useQuery("articles", fetchArticles, {
    select: (data) => data.data,
  });
}
