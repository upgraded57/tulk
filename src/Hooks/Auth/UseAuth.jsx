import { useMutation } from "react-query";
import axios from "axios";
import {
  loginUserFailure,
  loginUserSuccess,
} from "../../Store/Auth/Action/AuthActions";
import { getUserDataSuccess } from "../../Store/Userdata/Actions/GetUserdata";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UseAuth({ loginCredentials }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = ({ loginCredentials }) => {
    return axios({
      method: "post",
      url: `https://tulk-social-f7f4f4c56190.herokuapp.com/api/token/`,
      data: loginCredentials,
    });
  };
  return useMutation("loginUser", () => loginUser(loginCredentials), {
    onSuccess: (data) => {
      const access = data.data.access;
      const refresh = data.data.refresh;
      const tokens = { access, refresh };
      localStorage.setItem("tokens", JSON.stringify(tokens));
      localStorage.setItem("user", JSON.stringify(data.data.user));
      dispatch(loginUserSuccess(tokens));
      dispatch(getUserDataSuccess(data.data.user));
      toast.success("Login successful");
      navigate("/");
    },
    onError: (error) => {
      dispatch(loginUserFailure(error.message));
      toast.error("Unable to login! Check credentials");
    },
  });
}
