import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function useFetchProfile({ id }) {
  const fetchProfile = (id) => {
    return axiosInstance({
      method: "get",
      url: `/userprofiles/${id}/`,
    });
  };
  return useQuery(["profile", id], () => fetchProfile(id));
}
