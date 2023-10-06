import axios from "axios";
import { useQuery } from "react-query";

export default function UseFetchArticles() {
  const fetchArticles = () => {
    return axios({
      method: "get",
      url: "https://tulk-social-f7f4f4c56190.herokuapp.com/articles/",
    });
  };
  return useQuery("articles", fetchArticles);
}
