import React from "react";
import { Link } from "react-router-dom";

// styles
import "./userFriends.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";

export default function UserFriends({ friends }) {
  return (
    <div className="user-friends-div">
      {friends?.length === 0 ? (
        <>
          <p>No friends yet.</p>
          <div className="mt-md"></div>
        </>
      ) : (
        <>
          <div className="user-friends">
            {friends?.map((friend) => {
              return (
                <div className="user-friend" key={friend.id}>
                  <div className="user-friend-image">
                    <img
                      src={friend.avatar ? friend.avatar : noAvatar}
                      alt=""
                    />
                  </div>
                  <div className="user-friend-name-location">
                    <p className="text-body">{`${friend.first_name} ${friend.last_name}`}</p>
                    <small className="small-text">
                      {friend.locaton && friend.locaton}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="profile-see-all-friends-btn">
        <Link to="/friends/">See All</Link>
      </div>
    </div>
  );
}
