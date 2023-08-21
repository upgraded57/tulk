import React from "react";

// styles
import "./userFriends.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";

export default function UserFriends({ friends }) {
  return (
    <div className="user-friends-div">
      {friends.length < 1 ? (
        <>
          <p>You have no friends yet. Go make some friends</p>
          <div className="mt-md"></div>
        </>
      ) : (
        <>
          <div className="user-friends">
            {friends.map((friend) => {
              return (
                <div className="user-friend" key={friend.id}>
                  <div className="user-friend-image">
                    <img
                      src={
                        friend.user1_data.avatar
                          ? friend.user1_data.avatar
                          : noAvatar
                      }
                      alt=""
                    />
                  </div>
                  <div className="user-friend-name-location">
                    <p className="text-body">{`${friend.user1_data.first_name} ${friend.user1_data.last_name}`}</p>
                    <small className="small-text">
                      {friend.user1_data.locaton && friend.user1_data.locaton}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="profile-see-all-friends-btn">
        <a href="#">See All</a>
      </div>
    </div>
  );
}
