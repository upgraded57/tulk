import { useQuery } from "react-query";
import { axiosInstance } from "./../../Axios/axiosInstance";

export default function UseFetchConversations() {
  const fetchConversations = () => {
    return axiosInstance({
      method: "get",
      url: "/chat-list/",
    });
  };
  return useQuery("Conversations", fetchConversations, {
    select: (data) => data.data,
  });
}
