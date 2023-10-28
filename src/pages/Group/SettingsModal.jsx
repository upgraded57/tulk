import React, { useState } from "react";
import "../Login/login.css";
import { useQueryClient } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";
import { toast } from "react-hot-toast";

// icons
import { IoIosClose } from "react-icons/io";

export default function SettingsModal({ setSettingsModal, groupData }) {
  const queryClient = useQueryClient();
  //prepare group data
  const [name, setName] = useState(groupData.name);
  const [category, setCategory] = useState(groupData.category);
  const [location, setLocation] = useState(groupData.location);
  const [slogan, setSlogan] = useState(groupData.slogan);
  const [about, setAbout] = useState(groupData.about);
  const [admin_phone, setAdmin_phone] = useState(groupData.admin_phone);
  const [admin_email, setAdmin_email] = useState(groupData.admin_email);
  const [admin_website, setAdmin_website] = useState(groupData.admin_website);
  const admin = groupData.admin;

  const updateGroupData = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating group data...");
    const newGroupData = {
      name,
      category,
      location,
      slogan,
      about,
      admin_phone,
      admin_email,
      admin_website,
      admin,
    };
    await axiosInstance({
      method: "put",
      url: `/groups/${groupData.id}/`,
      data: newGroupData,
    })
      .then((res) => {
        toast.success("Group data updated successfully", {
          id: toastId,
        });
        queryClient.invalidateQueries(["groupData", groupData.id]);
        setSettingsModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to update group data!", {
          id: toastId,
        });
      });
  };

  return (
    <div className="signupPage">
      <div className="signup">
        <div className="signup-header">
          <div className="easy-signup">
            <h2 className="h-200">Update Group Data</h2>
          </div>
          <div
            className="signup-close-btn"
            onClick={() => {
              setSettingsModal(false);
            }}
          >
            <IoIosClose />
          </div>
        </div>

        <form className="signup-body" onSubmit={(e) => updateGroupData(e)}>
          <div className="signup-body-inputs">
            <input
              type="text"
              placeholder={groupData.name ? groupData.name : "Group Name..."}
              onChange={(e) => setName(e.target.value)}
            />
            <span>
              <input
                type="text"
                placeholder={
                  groupData.category ? groupData.category : "Group Category..."
                }
                onChange={(e) => setCategory(e.target.value)}
              />
              <input
                type="text"
                placeholder={
                  groupData.slogan ? groupData.slogan : "Group Slogan..."
                }
                onChange={(e) => setSlogan(e.target.value)}
              />
            </span>
            <input
              type="text"
              placeholder={
                groupData.about ? groupData.about : "Group Introductory Message"
              }
              onChange={(e) => setAbout(e.target.value)}
            />
            <span>
              <input
                type="text"
                placeholder={
                  groupData.location ? groupData.location : "Group Location..."
                }
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="email"
                placeholder={
                  groupData.admin_email
                    ? groupData.admin_email
                    : "Group Admin Email..."
                }
                onChange={(e) => setAdmin_email(e.target.value)}
              />
            </span>
            <span>
              <input
                type="text"
                placeholder={
                  groupData.admin_phone
                    ? groupData.admin_phone
                    : "Group Admin Phone..."
                }
                onChange={(e) => setAdmin_phone(e.target.value)}
              />
              <input
                type="text"
                placeholder={
                  groupData.admin_website
                    ? groupData.admin_website
                    : "Group Admin Website..."
                }
                onChange={(e) => setAdmin_website(e.target.value)}
              />
            </span>
          </div>
          <div className="signup-btn">
            <button className="btn-solid" type="submit">
              Update Group Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
