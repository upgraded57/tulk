import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseSearchPeople(search_query) {
  const fetchPeople = () => {
    return axiosInstance({
      method: "get",
      url: "/search/",
      params: {
        search: search_query,
        model: "users",
      },
    });
  };
  return useQuery(["fetchPeople", search_query], fetchPeople, {
    select: (data) => data.data.data,
  });
}
