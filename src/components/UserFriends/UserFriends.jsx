import React, { useState } from "react";

// styles
import "./userFriends.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import FriendsModal from "../../pages/Profile/FriendsModal";
import { useNavigate } from "react-router-dom";

export default function UserFriends({ friends, user }) {
  const navigate = useNavigate();
  const [friendsModal, setFriendsModal] = useState(false);
  return (
    <>
      <div className="user-friends-div">
        {friends?.length === 0 ? (
          <>
            <p>No friends yet.</p>
            <div className="mt-md"></div>
          </>
        ) : (
          <>
            <div className="user-friends">
              {friends?.slice(0, 8)?.map((friend) => {
                return (
                  <div
                    className="user-friend"
                    key={friend.id}
                    onClick={() => navigate(`/profile/${friend.id}`)}
                  >
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
        {friends?.length > 8 && (
          <div
            className="profile-see-all-friends-btn"
            onClick={() => setFriendsModal(true)}
          >
            See All
          </div>
        )}
      </div>
      {friendsModal && (
        <FriendsModal
          friends={friends}
          setFriendsModal={setFriendsModal}
          user={user}
        />
      )}
    </>
  );
}
