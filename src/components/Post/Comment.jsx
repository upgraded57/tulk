import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Axios/axiosInstance";
import noAvatar from "../../images/noAvatar.jpeg";
import { Link } from "react-router-dom";

export default function Comment({ comment, engagementModal }) {
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

  if (engagementModal) {
    return (
      <div className="engagement-like" key={comment.id}>
        <div className="liker-img">
          <Link
            to={`/profile/${postCommenter.id}/`}
            title={`${postCommenter.first_name} ${postCommenter.last_name}`}
          >
            <img
              src={postCommenter.avatar ? postCommenter.avatar : noAvatar}
              alt=""
            />
          </Link>
        </div>
        <div className="liker-name">
          {`${postCommenter.first_name} ${postCommenter.last_name}`} <br />
          <small className="small-font">{comment.content}</small>
        </div>
      </div>
    );
  } else {
    return (
      <li className="post-comment" key={comment.id}>
        {postCommenter && (
          <Link
            to={`/profile/${postCommenter.id}/`}
            title={`${postCommenter.first_name} ${postCommenter.last_name}`}
          >
            <div className="commenter-image">
              <img
                src={postCommenter.avatar ? postCommenter.avatar : noAvatar}
                loading="lazy"
                alt=""
              />
            </div>
          </Link>
        )}

        <p className="text-body comment">{comment.content}</p>
      </li>
    );
  }
}
