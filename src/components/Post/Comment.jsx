import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Axios/axiosInstance";
import noAvatar from "../../images/noAvatar.jpeg";

export default function Comment({ comment }) {
  const [postCommenter, setPostCommenter] = useState({});
  const fetchPostCommenter = async (postCommenter) => {
    await axiosInstance({
      method: "get",
      url: `/userprofiles/${postCommenter}/`,
    })
      .then((res) => {
        setPostCommenter(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPostCommenter(comment.user);
  }, []);

  return (
    <li className="post-comment" key={comment.id}>
      {postCommenter && (
        <div className="commenter-image">
          <img
            src={postCommenter.avatar ? postCommenter.avatar : noAvatar}
            alt=""
          />
        </div>
      )}

      <p className="text-body comment">{comment.content}</p>
    </li>
  );
}
