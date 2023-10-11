import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function useFetchProfile(profile_id) {
  const fetchProfile = (profile_id) => {
    return axiosInstance({
      method: "get",
      url: `/userprofiles/${profile_id}/`,
    });
  };
  return useQuery(["profile", profile_id], () => fetchProfile(profile_id), {
    select: (data) => data.data,
  });
}
