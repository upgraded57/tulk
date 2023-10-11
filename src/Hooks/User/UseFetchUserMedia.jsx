import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchUserMedia(user_id) {
  const fetchUserMedia = () => {
    return axiosInstance({
      method: "get",
      url: `/user-media/${user_id}`,
    });
  };
  return useQuery(["userMedia", user_id], () => fetchUserMedia(user_id), {
    select: (data) => data.data.results,
  });
}
