import { useQuery } from "react-query";
import axios from "axios";

export default function UseAuth({ loginCredentials }) {
  const loginUser = ({ loginCredentials }) => {
    return axios({
      method: "post",
      url: `https://tulk-social-f7f4f4c56190.herokuapp.com/api/token/`,
      data: loginCredentials,
    });
  };
  return useQuery("loginUser", () => loginUser(loginCredentials));
}
