import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Userdata } from "../../data/Userdata";

// styles
import "./profile.css";

// utils
import { axiosInstance } from "../../Axios/axiosInstance";

// API calls
import { sendFriendRequest } from "../../Axios/ApiCalls";

// icons
import { BsGear, BsCamera } from "react-icons/bs";
import { AiOutlineMessage, AiOutlineUserAdd } from "react-icons/ai";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import noBG from "../../images/noBG.jpg";

// components
import UserPhotos from "../../components/UserPhotos/UserPhotos";
import UserFriends from "../../components/UserFriends/UserFriends";
import UserGroups from "../../components/UserGroups/UserGroups";
import CreatePost from "../../components/CreatePost/CreatePost";
import EditProfile from "../../components/EditProfile/EditProfile";
import Post from "../../components/Post/Post";
import Navbar from "../../components/Navbar/Navbar";

// modals
import { toast } from "react-hot-toast";

// hooks
import useFetchProfile from "../../Hooks/User/useFetchProfile";
import UseFetchUserPosts from "./../../Hooks/User/UseFetchUserPosts";
import UseFetchUserFriends from "./../../Hooks/User/UseFetchUserFriends";
import UseFetchUserMedia from "./../../Hooks/User/UseFetchUserMedia";
import UseFetchUserGroups from "./../../Hooks/User/UseFetchUserGroups";

// tooltip
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import MessageTooltip from "./MessageTooltip";
import MediaModal from "./MediaModal";

const Profile = () => {
  const currentUser = Userdata();
  // fetch user profile
  const { profile_id } = useParams();
  const { data: user } = useFetchProfile(profile_id);

  // fetch user posts
  const { data: userPosts } = UseFetchUserPosts(profile_id);

  // fetch user friends
  const { data: friends } = UseFetchUserFriends(profile_id);

  // fetch user media
  const { data: userMedia } = UseFetchUserMedia(profile_id, "1");

  const { data: userGroups } = UseFetchUserGroups();

  // show edit profile modal
  const [editProfileModalIsVisible, setEditProfileModalIsVisible] =
    useState(false);
  const showEditProfileModal = () => {
    setEditProfileModalIsVisible(true);
  };

  // update user profile picture
  const handleUpdateUserAvatar = async () => {
    const toastId = toast.loading("Updating profile picture...");
    const updateUserAvatar = document.getElementById("updateUserAvatar");
    const newAvatar = updateUserAvatar.files[0];

    const formData = new FormData();
    formData.append("avatar", newAvatar);
    formData.append("phone_number", currentUser.phone);
    formData.append("email", currentUser.email);
    await axiosInstance({
      method: "put",
      url: `/userprofiles/${profile_id}/`,
      data: formData,
    })
      .then((res) => {
        toast.success("Profile Picture updated successfully!", {
          id: toastId,
        });
        console.log(res.data);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to update profile picture", {
          id: toastId,
        });
      });
  };

  // update cover photo
  const handleUpdateUserCoverPhoto = async () => {
    const toastId = toast.loading("Updating background picture...");
    const updateUserCoverPhoto = document.getElementById(
      "updateUserCoverPhoto"
    );
    const newCoverPhoto = updateUserCoverPhoto.files[0];

    const formData = new FormData();
    formData.append("background_image", newCoverPhoto);
    formData.append("phone_number", currentUser.phone);
    formData.append("email", currentUser.email);
    await axiosInstance({
      method: "put",
      url: `/userprofiles/${profile_id}/`,
      data: formData,
    })
      .then((res) => {
        toast.success("Cover photo updated successfully!", {
          id: toastId,
        });
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to update cover photo", {
          id: toastId,
        });
      });
  };

  const [showModal, setShowModal] = useState("photos");

  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile-user-data">
          <div className="profile-cover-photo">
            <img
              src={user?.background_image ? user?.background_image : noBG}
              alt=""
            />
            {profile_id === currentUser.user_id && (
              <div className="profile-cover-photo-update">
                <input
                  type="file"
                  id="updateUserCoverPhoto"
                  accept="image/png, image/gif, image/jpeg"
                  hidden
                  multiple={false}
                  onChange={handleUpdateUserCoverPhoto}
                />
                <label htmlFor="updateUserCoverPhoto">
                  <BsCamera />
                </label>
              </div>
            )}
          </div>
          <div className="profile-user-image-name">
            <div className="profile-user-avatar" id="profile-user-avatar">
              <img src={user?.avatar ? user?.avatar : noAvatar} alt="" />
              {profile_id === currentUser.user_id && (
                <div className="profile-user-avatar-update">
                  <input
                    type="file"
                    id="updateUserAvatar"
                    accept="image/png, image/gif, image/jpeg"
                    hidden
                    multiple={false}
                    onChange={handleUpdateUserAvatar}
                  />
                  <label htmlFor="updateUserAvatar">
                    <BsCamera />
                  </label>
                </div>
              )}
            </div>
            <div className="profile-user-name-slogan">
              {user?.first_name && (
                <h2 className="h-200">{`${user?.first_name} ${user?.last_name}`}</h2>
              )}
              <div className="profile-user-slogan mt-xsm">
                {user?.bio && <p>{user?.bio}</p>}
              </div>
            </div>

            <div className="profile-user-edit-button">
              {profile_id !== currentUser?.user_id &&
                friends
                  ?.map((friend) => friend.id !== profile_id)
                  .includes(true) && (
                  <button
                    className="btn-solid"
                    onClick={() => sendFriendRequest(currentUser.user_id, user)}
                  >
                    <AiOutlineUserAdd className="icon" /> Add Friend
                  </button>
                )}

              {profile_id !== currentUser.user_id && (
                <>
                  <button className="btn-secondary" id="msg-btn">
                    <AiOutlineMessage className="icon" />
                    Message
                  </button>
                  <Tooltip
                    anchorSelect="#msg-btn"
                    style={{
                      backgroundColor: "#a8a8a8",
                      padding: "5px",
                      borderRadius: "15px",
                    }}
                    place="bottom"
                    clickable
                  >
                    <MessageTooltip
                      sender={currentUser?.user_id}
                      recipient={user?.id}
                    />
                  </Tooltip>
                </>
              )}
              {profile_id === currentUser.user_id && (
                <button
                  className="btn-secondary"
                  onClick={showEditProfileModal}
                >
                  <BsGear className="icon" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Show edit profile modal */}
        {editProfileModalIsVisible && (
          <EditProfile
            setEditProfileModalIsVisible={setEditProfileModalIsVisible}
          />
        )}

        <div className="profile-user-info">
          <table>
            <tbody>
              {user?.work && (
                <tr>
                  <td>
                    <b> Works at</b>
                  </td>
                  <td>{user?.work}</td>
                </tr>
              )}
              {user?.school && (
                <tr>
                  <td>
                    <b>Studies at</b>
                  </td>
                  <td>{user?.school}</td>
                </tr>
              )}
              {user?.marital_status && (
                <tr>
                  <td>
                    <b>Marital Status</b>
                  </td>
                  <td>{user?.marital_status}</td>
                </tr>
              )}
              {user?.id === currentUser?.user_id && user?.date_of_birth && (
                <tr>
                  <td>
                    <b>DOB</b>
                  </td>
                  <td>{user?.date_of_birth}</td>
                </tr>
              )}
              {user?.phone_number && (
                <tr>
                  <td>
                    <b>Phone</b>
                  </td>
                  <td>{user?.phone_number}</td>
                </tr>
              )}
              {user?.email && (
                <tr>
                  <td>
                    <b>Email</b>
                  </td>
                  <td>{user?.email}</td>
                </tr>
              )}
              {user?.website && (
                <tr>
                  <td>
                    <b>Website</b>
                  </td>
                  <td>{user?.website}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="profile-bottom-page">
          <div className="profile-bottom-page-left">
            <div className="profile-action-buttons">
              <p
                className={showModal === "photos" ? "active" : ""}
                onClick={() => setShowModal("photos")}
              >
                Photos & Media
              </p>
              <p
                className={showModal === "friends" ? "active" : ""}
                onClick={() => setShowModal("friends")}
              >
                Friends
              </p>
              <p
                className={showModal === "groups" ? "active" : ""}
                onClick={() => setShowModal("groups")}
              >
                {user &&
                  currentUser &&
                  user.id === currentUser.user_id &&
                  "My "}
                Groups
              </p>
            </div>
            {showModal === "photos" && (
              <UserPhotos photos={userMedia} user={user} />
            )}
            {showModal === "friends" && (
              <UserFriends friends={friends} user={user} />
            )}
            {showModal === "groups" && <UserGroups groups={userGroups} />}
          </div>
          <div className="profile-bottom-page-right">
            {user?.id === currentUser?.user_id && <CreatePost />}

            {userPosts?.length === 0 ? (
              <p style={{ textAlign: "center", marginBlock: "30px" }}>
                No posts yet!
              </p>
            ) : (
              userPosts?.map((post) => {
                return <Post post={post} key={post.id} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
