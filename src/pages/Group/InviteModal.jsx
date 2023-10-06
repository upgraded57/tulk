import "../Login/login.css";

// icons
import { IoIosClose } from "react-icons/io";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import { Userdata } from "../../data/Userdata";
import UseFetchUserFriends from "./../../Hooks/User/UseFetchUserFriends";

export default function InviteModal({ setInviteModal }) {
  const user = Userdata();

  const { isLoading: userFriendsLoading, data: friends } = UseFetchUserFriends(
    user.user_id
  );

  const inviteesArray = [];
  const addInvitee = (e) => {
    if (inviteesArray.includes(e.target.id)) {
      inviteesArray.pop(e.target.id);
    } else {
      inviteesArray.push(e.target.id);
    }
  };

  const inviteFriends = () => {
    console.log(inviteesArray);
  };

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
                    <label htmlFor={friend.id} onChange={addInvitee}>
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
        </div>
        <div className="invite-btn">
          <button
            className="btn-secondary"
            onClick={() => {
              setInviteModal(false);
            }}
          >
            Cancel
          </button>
          <button className="btn-solid" onClick={inviteFriends}>
            Invite Friends
          </button>
        </div>
      </div>
    </div>
  );
}
