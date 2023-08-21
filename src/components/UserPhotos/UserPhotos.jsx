import React from "react";

// styles
import "./userPhotos.css";

// images
import userPhoto1 from "../../images/Frame 71.png";
import userPhoto2 from "../../images/Frame 72.png";
import userPhoto3 from "../../images/Frame 73.png";
import userPhoto4 from "../../images/Frame 74.png";
import userPhoto5 from "../../images/Frame 75.png";

export default function UserPhotos() {
  return (
    <div className="user-photos-div">
      <div className="profile-photos-media">
        <div className="profile-media">
          <img src={userPhoto1} alt="" />
        </div>
        <div className="profile-media">
          <img src={userPhoto1} alt="" />
        </div>
        <div className="profile-media">
          <img src={userPhoto3} alt="" />
        </div>
        <div className="profile-media">
          <img src={userPhoto1} alt="" />
        </div>
        <div className="profile-media">
          <img src={userPhoto2} alt="" />
        </div>
        <div className="profile-media">
          <img src={userPhoto1} alt="" />
        </div>
        <div className="profile-media">
          <img src={userPhoto5} alt="" />
        </div>
        <div className="profile-media">
          <img src={userPhoto1} alt="" />
        </div>
        <div className="profile-media">
          <img src={userPhoto4} alt="" />
        </div>
        <div className="profile-media">
          <img src={userPhoto1} alt="" />
        </div>
        <div className="profile-media">
          <img src={userPhoto1} alt="" />
        </div>
      </div>

      <div className="see-all-user-photos-btn">
        <a href="#">See All</a>
      </div>
    </div>
  );
}
