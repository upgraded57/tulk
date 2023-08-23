import React, { useEffect, useState } from "react";
import "../Login/login.css";

// api calls
import { fetchUserFriends } from "../../Axios/ApiCalls";

// icons
import { IoIosClose } from "react-icons/io";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import { Userdata } from "../../data/Userdata";

export default function InviteModal({ setInviteModal }) {
  const user = Userdata();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchUserFriends(user.user_id, setFriends);
  }, [user.user_id]);

  return (
    <div className="signupPage">
      <div className="signup">
        <div className="signup-header">
          <div className="easy-signup">
            <h2 className="h-200">Invite Friends</h2>
          </div>
          <div
            className="signup-close-btn"
            onClick={() => {
              setInviteModal(false);
            }}
          >
            <IoIosClose />
          </div>
        </div>

        <div className="invite-lists">
          {friends.length < 1 ? (
            <p>No Friends to invite. Make friends first</p>
          ) : (
            <>
              {friends.map((friend) => {
                return (
                  <div className="invite-list" key={friend.id}>
                    <label htmlFor={friend.id}>
                      <div className="invite-list-left">
                        <div className="invite-list-img">
                          <img
                            src={friend.avatar ? friend.avatar : noAvatar}
                            alt=""
                          />
                        </div>
                        <div className="invite-list-name">{`${friend.first_name} ${friend.last_name}`}</div>
                      </div>
                      <input
                        type="checkbox"
                        className="selectFriendsBox"
                        id={friend.id}
                      />
                    </label>
                  </div>
                );
              })}
            </>
          )}
        </div>

        <div className="invitees">
          <span>Invitee</span>
          <span>Invitee</span>
          <span>Invitee</span>
          <span>Invitee</span>
          <span>Invitee</span>
          <span>Invitee</span>
          <span>Invitee</span>
          <span>Invitee</span>
        </div>
        <div className="invite-btn">
          <button className="btn-secondary">Cancel</button>
          <button className="btn-solid">Invite Friends</button>
        </div>
      </div>
    </div>
  );
}
