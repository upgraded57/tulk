import axios from "axios";
// react hot toast
import toast from "react-hot-toast";

import {
  loginUserFailure,
  loginUserSuccess,
} from "../Store/Auth/Action/AuthActions";
import { getUserDataSuccess } from "../Store/Userdata/Actions/GetUserdata";
import { axiosInstance } from "./axiosInstance";

// initiate login
export const loginCall = async (loginCredentials, dispatch, navigate) => {
  const toastId = toast.loading("Loging you in");
  await axios({
    method: "post",
    url: `https://tulk.azurewebsites.net/api/token/`,
    data: loginCredentials,
  })
    .then((res) => {
      const access = res.data.access;
      const refresh = res.data.refresh;
      const tokens = { access, refresh };
      localStorage.setItem("tokens", JSON.stringify(tokens));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(loginUserSuccess(tokens));
      dispatch(getUserDataSuccess(res.data.user));
      toast.success("Login successful", {
        id: toastId,
      });
      navigate("/");
    })
    .catch((err) => {
      dispatch(loginUserFailure(err.message));
      if (err.response.data.non_field_errors[0]) {
        toast.error(
          "Unable to login! " + err.response.data.non_field_errors[0],
          {
            id: toastId,
          }
        );
      } else if (err.message === "Network Error") {
        toast.error("Unable to login! Network Error", {
          id: toastId,
        });
      } else {
        toast.error("Unable to login! Check credentials", {
          id: toastId,
        });
      }
    });
};

// fetch news
export const fetchArticles = async (setArticles) => {
  await axios({
    method: "get",
    url: "https://tulk.azurewebsites.net/articles/",
  })
    .then((res) => {
      setArticles(res.data.results);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchUsers = async (axiosInstance, setUsers, setLoading) => {
  await axiosInstance({
    method: "get",
    url: `/userprofiles/?page=1`,
  })
    .then((res) => {
      setUsers(res.data.results);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

// copy post link
export const copyPostLink = async (id, group) => {
  navigator?.clipboard
    .writeText(
      group === true
        ? `${window.location.origin}/group-posts/${id}`
        : `${window.location.origin}/posts/${id}`
    )
    .then(() => {
      toast.success("Post link copied");
    })
    .catch(() => {
      toast.error("Unable to copy link");
    });
};

// delete post
export const deletePost = async (axiosInstance, id) => {
  const requestDeleteConfirmation = window.confirm(
    "Delete Post? This action cannot be undone!"
  );

  if (requestDeleteConfirmation === false) {
    return;
  } else {
    const toastId = toast.loading("Deleting post...");
    await axiosInstance({
      method: "delete",
      url: `/posts/${id}/`,
    })
      .then(() => {
        toast.success("Post deleted", {
          id: toastId,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to delete post", {
          id: toastId,
        });
      });
  }
};

// get single post
export const getSinglePost = async (axiosInstance, id, setPost) => {
  await axiosInstance({
    method: "get",
    url: `/posts/${id}/`,
  })
    .then((res) => {
      setPost(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// send friend request
export const sendFriendRequest = async (user_id, friend) => {
  const toastId = toast.loading("Sending friend request ...");
  await axiosInstance({
    method: "post",
    url: "/friend-requests/",
    data: {
      accepted: false,
      sender: user_id,
      recipient: friend.id,
    },
  })
    .then(() => {
      toast.success("Friend request sent to " + friend.first_name, {
        id: toastId,
      });
    })
    .catch(() => {
      toast.error("Unable to send friend request!", {
        id: toastId,
      });
    });
};

// send friend request
export const acceptFriendRequest = async (
  axiosInstance,
  request,
  queryClient
) => {
  await axiosInstance({
    method: "put",
    url: `/friend-requests/${request.id}`,
    data: {
      accepted: true,
      sender: request.sender_id,
      recipient: request.recipient,
    },
  })
    .then((res) => {
      toast.success("Request accepted");
      axiosInstance({
        method: "delete",
        url: `/friend-requests/${request.id}`,
      });
    })
    .catch(() => {
      toast.error("An error occured!");
    })
    .finally(() => {
      queryClient.invalidateQueries(["friendRequests", "1"]);
      queryClient.invalidateQueries("Notifications");
    });
};

export const deleteFriendRequest = async (
  axiosInstance,
  request,
  queryClient
) => {
  await axiosInstance({
    method: "delete",
    url: `/friend-requests/${request.id}`,
  })
    .then(() => {
      toast.success("Request deleted");
    })
    .catch((err) => {
      console.log(err);
      toast.error("An error occured");
    })
    .finally(() => {
      queryClient.invalidateQueries(["friendRequests", "1"]);
      queryClient.invalidateQueries("Notifications");
    });
};

// fetch user groups
export const fetchUserGroups = async (axiosInstance, setUserGroups) => {
  await axiosInstance({
    method: "get",
    url: `/user-groups/`,
  })
    .then((res) => {
      setUserGroups(res.data.results);
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch user media
export const fetchUserMedia = async (axiosInstance, user_id, setUserMedia) => {
  await axiosInstance({
    method: "get",
    url: `/user-media/${user_id}/?page=1`,
  })
    .then((res) => {
      setUserMedia(res.data.results);
    })
    .catch((err) => {
      console.log(err);
    });
};
