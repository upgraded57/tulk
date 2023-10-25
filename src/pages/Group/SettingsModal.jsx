import React, { useState } from "react";
import "../Login/login.css";

// icons
import { IoIosClose } from "react-icons/io";
import { axiosInstance } from "../../Axios/axiosInstance";
import { toast } from "react-hot-toast";

export default function SettingseModal({ setSettingsModal, groupData }) {
  //prepare group data
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [slogan, setSlogan] = useState("");
  const [about, setAbout] = useState("");
  const [admin_phone, setAdmin_phone] = useState("");
  const [admin_email, setAdmin_email] = useState("");
  const [admin_website, setAdmin_website] = useState("");
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
      url: `/groups/${groupData.id}/update/`,
      data: newGroupData,
    })
      .then((res) => {
        toast.success("Group data updated successfully", {
          id: toastId,
        });
        console.log(res.data);
        // window.location.reload();
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
              placeholder="Group Name..."
              onChange={(e) => setName(e.target.value)}
            />
            <span>
              <input
                type="text"
                placeholder="Group Category..."
                onChange={(e) => setCategory(e.target.value)}
              />
              <input
                type="text"
                placeholder="Group Slogan..."
                onChange={(e) => setSlogan(e.target.value)}
              />
            </span>
            <input
              type="text"
              placeholder=" Group Introductory Message"
              onChange={(e) => setAbout(e.target.value)}
            />
            <span>
              <input
                type="text"
                placeholder="Group Location..."
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="email"
                placeholder="Group Admin Email..."
                onChange={(e) => setAdmin_email(e.target.value)}
              />
            </span>
            <span>
              <input
                type="text"
                placeholder="Group Admin Phone..."
                onChange={(e) => setAdmin_phone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Group Admin Website..."
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
