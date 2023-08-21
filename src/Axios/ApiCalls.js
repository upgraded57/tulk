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
    url: `https://tulk-social-f7f4f4c56190.herokuapp.com/api/token/`,
    data: loginCredentials,
  })
    .then((res) => {
      const access = res.data.access;
      const refresh = res.data.refresh;
      const tokens = { access, refresh };
      dispatch(loginUserSuccess(tokens));
      localStorage.setItem("tokens", JSON.stringify(tokens));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(getUserDataSuccess(res.data.user));
      navigate("/");
      toast.success("Login successful", {
        id: toastId,
      });
    })
    .catch((err) => {
      dispatch(loginUserFailure(err.message));
      toast.error("Unable to login! Check credentials", {
        id: toastId,
      });
    });
};

// get a user
export const fetchProfileUser = async (axiosInstance, profile_id, setUser) => {
  await axiosInstance({
    method: "get",
    url: `/userprofiles/${profile_id}/`,
  })
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Persist user login
// export const persistLogin = async () => {

// }

// get user timeline posts
export const fetchUserPosts = async (
  axiosInstance,
  profile_id,
  setUserPosts
) => {
  await axiosInstance({
    url: `/users/${profile_id}/posts/`,
    method: "get",
  })
    .then((res) => {
      setUserPosts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get all groups
export const fetchGroups = async (axiosInstance, setGroups) => {
  await axiosInstance({
    url: "/groups/",
    method: "get",
  })
    .then((res) => {
      setGroups(res.data.results);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get single group data
export const getGroupData = async (group_id, setGroupData) => {
  await axiosInstance({
    url: `/groups/${group_id}/`,
    method: "get",
  })
    .then((res) => {
      setGroupData(res.data);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Unable to fetch group data now");
    });
};

// get online friends
export const getOnlineFriends = async (setOnlineFriends) => {
  await axiosInstance({
    method: "get",
    url: `/friendships/?page=1`,
  })
    .then((res) => {
      setOnlineFriends(res.data.results);
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch news
export const fetchArticles = async (setArticles) => {
  await axios({
    method: "get",
    url: "https://tulk-social-f7f4f4c56190.herokuapp.com/articles/",
  })
    .then((res) => {
      setArticles(res.data.results);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchUserFriends = async (setFriends) => {
  await axiosInstance({
    method: "get",
    url: `/friendships/?page=1`,
  })
    .then((res) => {
      setFriends(res.data.results);
    })
    .catch((err) => {
      console.log(err);
    });
  // .finally(() => {
  //   setLoading(false);
  // });
};

export const fetchFriendRequests = async (setFriendRequests, setLoading) => {
  await axiosInstance({
    method: "get",
    url: `/friend-requests/?page=1`,
  })
    .then((res) => {
      setFriendRequests(res.data.results);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

export const fetchUsers = async (setUsers, setLoading) => {
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
export const deletePost = async (id) => {
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
export const getSinglePost = async (id, setPost) => {
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
    .catch((err) => {
      console.log(err);
      toast.error("Unable to send friend request!", {
        id: toastId,
      });
    });
};

// send friend request
export const acceptFriendRequest = async (request) => {
  console.log(request);
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
      console.log(res);
      toast.success("Request accepted");
      axiosInstance({
        method: "delete",
        url: `/friend-requests/${request.id}`,
      });
    })
    .catch(() => {
      toast.error("An error occured!");
    });
};

export const deleteFriendRequest = async (request) => {
  await axiosInstance({
    method: "delete",
    url: `/friend-requests/${request.id}`,
  })
    .then(() => {
      toast.success("Request deleted");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      toast.error("An error occured");
    });
};
