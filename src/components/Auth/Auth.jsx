import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// hot toast
import toast from "react-hot-toast";

import jwt_decode from "jwt-decode";

// action
import {
  getUserDataSuccess,
  getUserDataFailure,
} from "../../Store/Userdata/Actions/GetUserdata";

export default function Auth() {
  // get tokens from store
  const tokens = useSelector((state) => state.auth);

  const access_token = tokens.token.access;
  const refresh_token = tokens.token.refresh;

  const UID = jwt_decode(access_token).user_id;

  // get current user
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    await axios({
      method: "get",
      url: `https://tulk-social-f7f4f4c56190.herokuapp.com/userprofiles/${UID}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => {
        dispatch(getUserDataSuccess(res.data));
        navigate("/");
      })
      .catch((err) => {
        dispatch(getUserDataFailure(err.message));
        toast.error("Error Fetching Profile! Please login again");
        navigate("/login");
      });
  };

  getCurrentUser();
  return null;
}
