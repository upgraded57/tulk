import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// styles
import "./friends.css";

// api calls
import { fetchUserFriends } from "../../Axios/ApiCalls";

export default function Friends() {
  // fetch friends
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    fetchUserFriends(setFriends, setLoading);
  }, []);
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
        {friends.map((friend) => {
          return (
            <div className="friend" key={friend.id}>
              <Link to={`/profile/${friend.user1_data.id}/`}>
                <img src={friend.user1_data.avatar} alt="" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
