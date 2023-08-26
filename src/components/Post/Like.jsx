import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Axios/axiosInstance";
import { Link } from "react-router-dom";

import noAvatar from "../../images/noAvatar.jpeg";
import moment from "moment";

export default function Like(liker) {
  // fetch post likers
  const [postLiker, setPostLiker] = useState({});

  const fetchPostLiker = async (likerId) => {
    await axiosInstance({
      method: "get",
      url: `/userprofiles/${likerId}/`,
    })
      .then((res) => {
        setPostLiker(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPostLiker(liker.liker.user);
  }, []);

  return (
    <div className="engagement-like">
      {postLiker && (
        <>
          <div className="liker-img">
            <Link
              to={`/profile/${postLiker.id}/`}
              title={`${postLiker.first_name} ${postLiker.last_name}`}
            >
              <img
                src={postLiker.avatar ? postLiker.avatar : noAvatar}
                alt=""
                loading="lazy"
              />
            </Link>
          </div>
          <div className="liker-name">
            {`${postLiker.first_name} ${postLiker.last_name}`}
            <br />
            <small className="small-font">
              {moment(liker.liker.liked_at).fromNow()}
            </small>
          </div>
        </>
      )}
    </div>
  );
}
