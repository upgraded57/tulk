import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchGroupPosts({ group_id }) {
  const fetchGroupPosts = (group_id) => {
    return axiosInstance({
      method: "get",
      url: `/group/${group_id}/posts/`,
    });
  };
  return useQuery(["groupPosts", group_id], fetchGroupPosts(group_id), {
    select: (data) => data.data,
  });
}
