import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchUserMedia({ user_id, pageNum }) {
  const fetchUserMedia = () => {
    return axiosInstance({
      method: "get",
      url: `/user-media/${user_id}/?page=${pageNum}`,
    });
  };
  return useQuery(["userMedia", user_id, pageNum], () =>
    fetchUserMedia(user_id, pageNum)
  );
}
