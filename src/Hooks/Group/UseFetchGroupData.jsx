import { useQuery } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function UseFetchGroupData({ group_id }) {
  const fetchGroupData = () => {
    return axiosInstance({
      url: `/groups/${group_id}/`,
      method: "get",
    });
  };
  return useQuery(["groupData", group_id], () => fetchGroupData(group_id), {
    select: (data) => data.data,
  });
}
