import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Userdata } from "../../data/Userdata";

// styles
import "./profile.css";

import { axiosInstance } from "../../Axios/axiosInstance";
import {
  fetchUserPosts,
  fetchProfileUser,
  fetchUserFriends,
  sendFriendRequest,
} from "../../Axios/ApiCalls";
// icons
import { BsGear, BsCamera } from "react-icons/bs";
import { AiOutlineMessage, AiOutlineUserAdd } from "react-icons/ai";

// images
import noAvatar from "../../images/noAvatar.jpeg";

// components
import UserPhotos from "../../components/UserPhotos/UserPhotos";
import UserFriends from "../../components/UserFriends/UserFriends";
import UserGroups from "../../components/UserGroups/UserGroups";
import CreatePost from "../../components/CreatePost/CreatePost";

// modals
import EditProfile from "../../components/EditProfile/EditProfile";
import { toast } from "react-hot-toast";
import Post from "../../components/Post/Post";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  const currentUser = Userdata();
  // fetch user profile
  const { profile_id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    fetchProfileUser(axiosInstance, profile_id, setUser);
  }, [profile_id]);

  // functions
  const [showPhotos, setShowPhotos] = useState(true);
  const [showFriends, setShowFriends] = useState(false);
  const [showGroups, setShowGroups] = useState(false);

  // buttons from DOM
  const [showPhotosBtn, setShowPhotosBtn] = useState(null);
  const [showFriendsBtn, setShowFriendsBtn] = useState(null);
  const [showGroupsBtn, setShowGroupsBtn] = useState(null);

  useEffect(() => {
    setShowPhotosBtn(document.getElementById("showPhotosBtn"));
    setShowFriendsBtn(document.getElementById("showFriendsBtn"));
    setShowGroupsBtn(document.getElementById("showGroupsBtn"));
  }, []);
  // function to display user photos and media
  const showPhotosFunction = () => {
    // display only necessary component
    if (!showPhotos) {
      setShowPhotos(true);
    }
    setShowFriends(false);
    setShowGroups(false);

    // adds style to button
    if (!showPhotosBtn.classList.contains("active")) {
      showPhotosBtn.classList.add("active");
    }

    if (showFriendsBtn.classList.contains("active")) {
      showFriendsBtn.classList.remove("active");
    }

    if (showGroupsBtn.classList.contains("active")) {
      showGroupsBtn.classList.remove("active");
    }
  };

  // function to display user friends
  const showFriendsFunction = () => {
    // display only necessary component
    if (!showFriends) {
      setShowFriends(true);
    }

    setShowPhotos(false);
    setShowGroups(false);

    // adds style to button
    if (!showFriendsBtn.classList.contains("active")) {
      showFriendsBtn.classList.add("active");
    }

    if (showPhotosBtn.classList.contains("active")) {
      showPhotosBtn.classList.remove("active");
    }

    if (showGroupsBtn.classList.contains("active")) {
      showGroupsBtn.classList.remove("active");
    }
  };

  // function to display user groups
  const showGroupsFunction = () => {
    // display only necessary component
    if (!showGroups) {
      setShowGroups(true);
    }
    setShowPhotos(false);
    setShowFriends(false);

    // adds style to button
    if (!showGroupsBtn.classList.contains("active")) {
      showGroupsBtn.classList.add("active");
    }

    if (showFriendsBtn.classList.contains("active")) {
      showFriendsBtn.classList.remove("active");
    }

    if (showPhotosBtn.classList.contains("active")) {
      showPhotosBtn.classList.remove("active");
    }
  };

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

  // fetch user posts
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchUserPosts(axiosInstance, profile_id, setUserPosts);
  }, [profile_id]);

  // fetch user friends
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetchUserFriends(setFriends);
  }, []);

  const friendsIdArray = [];

  friends.forEach((friend) => {
    friendsIdArray.push(friend.user1_data.id);
  });

  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile-user-data">
          <div className="profile-cover-photo">
            <img src={user.background_image} alt="" />
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
              <img src={user.avatar ? user.avatar : noAvatar} alt="" />
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
              {user.first_name && (
                <h2 className="h-200">{`${user.first_name} ${user.last_name}`}</h2>
              )}
              <div className="profile-user-slogan mt-xsm">
                {user.bio && <p>{user.bio}</p>}
              </div>
            </div>

            <div className="profile-user-edit-button">
              {profile_id !== currentUser.user_id &&
                !friendsIdArray.includes(profile_id) && (
                  <button
                    className="btn-solid"
                    onClick={() => sendFriendRequest(currentUser.user_id, user)}
                  >
                    <AiOutlineUserAdd className="icon" /> Add Friend
                  </button>
                )}

              {profile_id !== currentUser.user_id && (
                <button className="btn-secondary">
                  <AiOutlineMessage className="icon" />
                  Message
                </button>
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
          {user.work && (
            <h3 className="h-100">
              Works at: <b>{user.work} </b>
            </h3>
          )}
          {user.school && (
            <h3 className="h-100">
              Studied at: <b>{user.school}</b>
            </h3>
          )}
          {user.marital_status && (
            <h3 className="h-100">
              Marital Status: <b>Single</b>
            </h3>
          )}
          {user.date_of_birth && (
            <h3 className="h-100">
              Birthday: <b> {user.date_of_birth} </b>
            </h3>
          )}
          {user.phone_number && (
            <h3 className="h-100">
              Contact: <b>{user.phone_number} </b>
            </h3>
          )}
          {user.email && (
            <h3 className="h-100">
              Email: <b>{user.email}</b>
            </h3>
          )}
          {user.website && (
            <h3 className="h-100">
              Web: <b>{user.website}</b>
            </h3>
          )}
        </div>

        <div className="profile-bottom-page">
          <div className="profile-bottom-page-left">
            <div className="profile-action-buttons">
              <p
                className="active"
                id="showPhotosBtn"
                onClick={showPhotosFunction}
              >
                Photos & Media
              </p>
              <p className="" id="showFriendsBtn" onClick={showFriendsFunction}>
                Friends
              </p>
              <p className="" id="showGroupsBtn" onClick={showGroupsFunction}>
                My Groups
              </p>
            </div>
            {showPhotos && <UserPhotos />}
            {showFriends && <UserFriends friends={friends} />}
            {showGroups && <UserGroups />}
            {/* {showFriends && <UserGroups />} */}
          </div>
          <div className="profile-bottom-page-right">
            <CreatePost />
            {userPosts.map((post) => {
              return <Post post={post} key={post.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
