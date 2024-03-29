import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Userdata } from "../../data/Userdata";
import { axiosInstance } from "../../Axios/axiosInstance";

// styles
import "./friends.css";

// api calls
import { fetchUserFriends } from "../../Axios/ApiCalls";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import UseFetchUserFriends from "../../Hooks/User/UseFetchUserFriends";

export default function Friends() {
  const user = Userdata();
  // fetch friends
  const { data: friends } = UseFetchUserFriends(user.user_id);

  return (
    <div className="friendsDiv mt-lg">
      <div className="friends-header">
        <h3 className="h-100">My Friends</h3>
        <div className="load-more-friends">
          <Link to="/friends" className="text-body">
            More
          </Link>
        </div>
      </div>

      <div className="friends">
        {friends && friends[0] && (
          <div className="friend" key={friends[0].id}>
            <Link to={`/profile/${friends[0].id}/`}>
              <img
                src={friends[0].avatar ? friends[0].avatar : noAvatar}
                alt=""
              />
            </Link>
          </div>
        )}

        {friends && friends[1] && (
          <div className="friend" key={friends[1].id}>
            <Link to={`/profile/${friends[1].id}/`}>
              <img
                src={friends[1].avatar ? friends[1].avatar : noAvatar}
                alt=""
              />
            </Link>
          </div>
        )}

        {friends && friends[2] && (
          <div className="friend" key={friends[2].id}>
            <Link to={`/profile/${friends[2].id}/`}>
              <img
                src={friends[2].avatar ? friends[2].avatar : noAvatar}
                alt=""
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
