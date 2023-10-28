import "../Login/login.css";

// icons
import { IoIosClose } from "react-icons/io";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import { Userdata } from "../../data/Userdata";
import UseFetchUserFriends from "./../../Hooks/User/UseFetchUserFriends";
import { axiosInstance } from "../../Axios/axiosInstance";
import toast from "react-hot-toast";

export default function InviteModal({ setInviteModal, group }) {
  const user = Userdata();

  const { data: friends } = UseFetchUserFriends(user.user_id);

  const inviteFriends = () => {
    const Invitees = Array.from(
      document.querySelectorAll('.invite-list input[type="checkbox"]')
    )
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);

    const toastId = toast.loading("Sending group invite...");
    Invitees.forEach(
      async (invitee) =>
        await axiosInstance({
          method: "post",
          url: `/groups/${group.id}/invite/`,
          data: { user_id: invitee },
        })
          .then((res) => {
            console.log(res);
            toast.success("Selected users will be invited", {
              id: toastId,
            });
            setInviteModal(false);
          })
          .catch((err) => {
            toast.error("Unable to send invite", {
              id: toastId,
            });
            console.log(err);
          })
    );
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
          {friends?.length < 1 ? (
            <p>No Friends to invite. Make friends first</p>
          ) : (
            <>
              {friends?.map((friend) => {
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
