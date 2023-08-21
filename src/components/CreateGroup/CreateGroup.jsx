import React, { useState } from "react";
import { Userdata } from "../../data/Userdata";
import { axiosInstance } from "../../Axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// styles
import "./createGroup.css";
import Navbar from "../Navbar/Navbar";

export default function CreateGroup() {
  // select current user
  const user = Userdata();

  // const authAxios = axiosInstance();

  const navigate = useNavigate();

  // group media upload
  const [groupBackgroundImage, setGroupBackgroundImage] = useState("");
  const [groupBackgroundImageFile, setGroupBackgroundImageFile] = useState(
    null
  );
  const [groupAvatar, setGroupAvatar] = useState("");
  const [groupAvatarFile, setGroupAvatarFile] = useState(null);

  const chooseGroupBackgroundImage = (e) => {
    const coverImgURL = URL.createObjectURL(e.target.files[0]);
    setGroupBackgroundImageFile(e.target.files[0]);
    const labelContainer = document.querySelector(
      ".create-group-bg-image-label-holder img"
    );

    labelContainer.src = coverImgURL;

    setGroupBackgroundImage(e.target.files[0].name);
  };

  const chooseGroupAvatar = (e) => {
    const coverImgURL = URL.createObjectURL(e.target.files[0]);
    setGroupAvatarFile(e.target.files[0]);
    const labelContainer = document.querySelector(
      ".create-group-avatar-label-holder img"
    );

    labelContainer.src = coverImgURL;
    setGroupAvatar(e.target.files[0].name);
  };
  // prepare group data
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  const [groupLocation, setGroupLocation] = useState("");
  const [groupSlogan, setGroupSlogan] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [groupPhone, setGroupPhone] = useState("");
  const [groupEmail, setGroupEmail] = useState("");
  const [groupWebsite, setGroupWebsite] = useState("");

  // create group
  const createGroup = async (e) => {
    e.preventDefault();
    // group form data
    const groupFormData = new FormData();
    groupFormData.append("name", groupName);
    groupFormData.append("category", groupTag);
    groupFormData.append("location", groupLocation);
    groupFormData.append("slogan", groupSlogan);
    groupFormData.append("about", groupDesc);
    groupFormData.append("admin_phone", groupPhone);
    groupFormData.append("admin_email", groupEmail);
    groupFormData.append("admin_website", groupWebsite);
    groupFormData.append("avatar", groupAvatarFile);
    groupFormData.append("background_image", groupBackgroundImageFile);
    groupFormData.append("creator", user.user_id);
    groupFormData.append("members", user.user_id);

    await axiosInstance({
      url: "/groups/create/",
      method: "post",
      data: groupFormData,
    })
      .then((res) => {
        toast.success("Group Created Successfully");
        console.log(res);
        const newGroupId = res.data.id;
        navigate(`/groups/${newGroupId}`);
      })
      .catch((err) => {
        toast.error("Unable to create group");
        console.log(err);
        return;
      });
  };
  return (
    <>
      <Navbar />
      <form onSubmit={createGroup}>
        <div className="create-group">
          <div className="create-group-bg-image">
            <input
              required
              type="file"
              className="create-group-bg-image-input"
              id="createGroupBgImageInput"
              maxLength="1"
              onChange={chooseGroupBackgroundImage}
            />
            <div className="create-group-bg-image-label-holder">
              <img src="" alt="" />
            </div>
            <label
              htmlFor="createGroupBgImageInput"
              className="create-group-bg-image-label"
            >
              <span>Add background Photo</span>
            </label>
          </div>

          <div className="create-group-avatar">
            <input
              required
              type="file"
              className="create-group-avatar-input"
              id="createGroupAvatarInput"
              maxLength="1"
              onChange={chooseGroupAvatar}
            />
            <div className="create-group-avatar-label-holder">
              <img src="" alt="" />
            </div>
            <label
              htmlFor="createGroupAvatarInput"
              className="create-group-avatar-label"
            >
              Add <br />
              Photo
            </label>
          </div>

          <div className="create-group-input-fields">
            <input
              required
              type="text"
              placeholder="Group Name"
              onChange={(e) => setGroupName(e.target.value)}
            />

            <div className="create-group-input-fields-flex">
              <input
                required
                type="text"
                placeholder="Group Tag"
                onChange={(e) => setGroupTag(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Location"
                onChange={(e) => setGroupLocation(e.target.value)}
              />
            </div>

            <input
              required
              type="text"
              placeholder="Slogan"
              onChange={(e) => setGroupSlogan(e.target.value)}
            />
            <textarea
              required
              rows="5"
              placeholder="About"
              onChange={(e) => setGroupDesc(e.target.value)}
            ></textarea>
            <div className="create-group-input-fields-flex">
              <input
                required
                type="text"
                placeholder="Phone Contact"
                onChange={(e) => setGroupPhone(e.target.value)}
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                onChange={(e) => setGroupEmail(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Website/Link"
              onChange={(e) => setGroupWebsite(e.target.value)}
            />
            <button className="btn-solid" type="submit">
              Create Group
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
