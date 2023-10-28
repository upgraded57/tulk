import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/CreatePost/CreatePost";
import Navbar from "../../components/Navbar/Navbar";
import { Userdata } from "../../data/Userdata";
import { axiosInstance } from "../../Axios/axiosInstance";
import InviteModal from "./InviteModal";
import { toast } from "react-hot-toast";
import SettingsModal from "./SettingsModal";

// styles
import "./group.css";

// icons
import { BsGear, BsCamera } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import UseFetchGroupData from "../../Hooks/Group/UseFetchGroupData";
import UseFetchGroupPosts from "../../Hooks/Group/UseFetchGroupPosts";
import UseFetchUserGroups from "./../../Hooks/User/UseFetchUserGroups";

const Group = () => {
  const user = Userdata();
  const { group_id } = useParams();

  const { isLoading: groupDataLoading, data: groupData } =
    UseFetchGroupData(group_id);

  const { isLoading: groupPostsLoading, data: groupPosts } =
    UseFetchGroupPosts(group_id);

  const { isLoading: userGroupsLoading, data: userGroups } =
    UseFetchUserGroups();

  const [inviteModal, setInviteModal] = useState(false);
  const [settingseModal, setSettingsModal] = useState(false);

  // update group avatar
  const handleUpdateGroupAvatar = async (e) => {
    const toastId = toast.loading("Updating group avatar");
    const newGroupAvatar = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", newGroupAvatar);

    await axiosInstance({
      method: "patch",
      url: `/groups/${groupData?.id}`,
      data: formData,
    })
      .then(() => {
        toast.success("Group avatar updated", {
          id: toastId,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to update group avatar", {
          id: toastId,
        });
      });
  };

  // update group cover photo
  const handleUpdateGroupCoverPhoto = async (e) => {
    const toastId = toast.loading("Updating group cover photo");
    const newGroupCover = e.target.files[0];

    const formData = new FormData();
    formData.append("background_image", newGroupCover);

    await axiosInstance({
      method: "patch",
      url: `/groups/${groupData?.id}`,
      data: formData,
    })
      .then(() => {
        toast.success("Group cover photo updated", {
          id: toastId,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to update group cover photo", {
          id: toastId,
        });
      });
  };

  let userGroupIds = [];
  userGroups?.forEach((userGroup) => {
    userGroupIds.push(userGroup.id);
  });

  return (
    <>
      <Navbar />
      <div className="group-page">
        <div className="group-data">
          <div className="group-cover-photo">
            <img src={groupData?.background_image} alt="" />
            {groupData?.id === user.user_id && (
              <div className="group-cover-photo-update">
                <input
                  type="file"
                  id="updateUserCoverPhoto"
                  accept="image/png, image/gif, image/jpeg"
                  hidden
                  multiple={false}
                  onChange={handleUpdateGroupCoverPhoto}
                />
                <label htmlFor="updateUserCoverPhoto">
                  <BsCamera />
                </label>
              </div>
            )}
          </div>
          <div className="group-image-name">
            <div className="group-avatar">
              <img src={groupData?.avatar} alt="" />
              {groupData?.id === user.user_id && (
                <div className="group-avatar-update-icon">
                  <input
                    type="file"
                    id="updateGroupAvatar"
                    accept="image/png, image/gif, image/jpeg"
                    hidden
                    multiple={false}
                    onChange={handleUpdateGroupAvatar}
                  />
                  <label htmlFor="updateGroupAvatar">
                    <BsCamera />
                  </label>
                </div>
              )}
            </div>
            <div className="group-name-slogan">
              <h2 className="h-200">{groupData?.name}</h2>
              <div className="group-slogan mt-xsm">
                <p>{groupData?.category?.toUpperCase()}</p>
                <div className="group-members-count">
                  <p>{groupData?.members?.length} Members</p>
                </div>
              </div>
            </div>

            {groupData?.id !== user.user_id && (
              <div className="group-edit-button">
                <button
                  className="btn-secondary"
                  onClick={() => setInviteModal(!inviteModal)}
                >
                  <AiOutlineUserAdd className="icon" />
                  Invite
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setSettingsModal(!settingseModal)}
                >
                  <BsGear className="icon" /> Settings
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="group-info">
          {groupData?.slogan && (
            <h3 className="h-100">
              <b> Slogan: </b> <br />
              {groupData?.slogan}
            </h3>
          )}
          {groupData?.about && (
            <h3 className="h-100">
              <b>Group introduction message</b> <br />
              {groupData?.about}
            </h3>
          )}
        </div>

        <div className="group-posts">
          {userGroupIds.includes(group_id) && <CreatePost group={groupData} />}
          {groupPosts?.map((groupPost) => {
            return <Post post={groupPost} key={groupPost.id} group />;
          })}
        </div>
      </div>
      {inviteModal && (
        <InviteModal setInviteModal={setInviteModal} group={groupData} />
      )}
      {settingseModal && (
        <SettingsModal
          setSettingsModal={setSettingsModal}
          groupData={groupData}
        />
      )}
    </>
  );
};

export default Group;
