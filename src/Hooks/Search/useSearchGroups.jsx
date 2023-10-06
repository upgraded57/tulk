import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function useSearchGroups({ search_query }) {
  const searchGroups = (search_query) => {
    return axiosInstance({
      method: "get",
      url: "/search/",
      params: {
        search: search_query,
        model: "groups",
      },
    });
  };
  return useQuery(
    ["searchGroups", search_query],
    () => searchGroups(search_query),
    {
      select: (data) => data.data.data,
    }
  );
}
