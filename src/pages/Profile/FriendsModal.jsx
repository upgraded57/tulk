import { IoIosClose } from "react-icons/io";
import "./../../components/Signup/signup.css";
import "./profile.css";
import { Link, useNavigate } from "react-router-dom";
import noAvatar from "../../images/noAvatar.jpeg";
import { Userdata } from "../../data/Userdata";
import UseFetchUserFriends from "../../Hooks/User/UseFetchUserFriends";
import { axiosInstance } from "../../Axios/axiosInstance";
import { sendFriendRequest } from "../../Axios/ApiCalls";

export default function FriendsModal({ setFriendsModal, friends, user }) {
  const currentUser = Userdata();
  const navigate = useNavigate();

  // fetch user friends
  const { data: userFriends } = UseFetchUserFriends(user.user_id);

  const friendsId = [];
  userFriends?.forEach((friend) => {
    friendsId.push(friend.id);
  });

  return (
    <div className="signupPage">
      <div className="signup">
        <div className="signup-header">
          <div className="easy-signup">
            <h2 className="h-200">{`${user.first_name}'s Friends`}</h2>
          </div>
          <div
            className="signup-close-btn"
            onClick={() => {
              setFriendsModal(false);
            }}
          >
            <IoIosClose />
          </div>
        </div>

        <div className="photo-media-modal">
          <div className="friends-modal-lists">
            {friends.map((friend) => (
              <div className="friends-modal-list" key={friend.id}>
                <Link
                  to={`/profile/${friend.id}`}
                  onClick={() => setFriendsModal(false)}
                >
                  <div className="avatar">
                    <img
                      src={friend.avatar ? friend.avatar : noAvatar}
                      alt=""
                    />
                  </div>
                  <p className="text-body">{`${friend.first_name} ${friend.last_name}`}</p>
                </Link>
                {currentUser.user_id !== friend.id &&
                  !friendsId.includes(friend.id) && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() =>
                        sendFriendRequest(currentUser.user_id, friend)
                      }
                    >
                      Add Friend
                    </button>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
