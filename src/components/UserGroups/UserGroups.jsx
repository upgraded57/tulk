import React from "react";

// styles
import "./userGroups.css";

// images
import userPhoto6 from "../../images/Frame 80.png";

export default function UserGroups() {
  return (
    <div className="user-groups-div">
      <div className="user-group-filter-type">By Me:</div>
      <div className="user-groups">
        <div className="user-group">
          <div className="user-group-image">
            <img src={userPhoto6} alt="" />
          </div>
          <div className="user-group-name-tag">
            <h3 className="h-100">First Dates</h3>
            <small className="small-text">Education</small>
          </div>
        </div>

        <div className="user-group">
          <div className="user-group-image">
            <img src={userPhoto6} alt="" />
          </div>
          <div className="user-group-name-tag">
            <h3 className="h-100">First Dates</h3>
            <small className="small-text">Education</small>
          </div>
        </div>

        <div className="user-group">
          <div className="user-group-image">
            <img src={userPhoto6} alt="" />
          </div>
          <div className="user-group-name-tag">
            <h3 className="h-100">First Dates</h3>
            <small className="small-text">Education</small>
          </div>
        </div>
      </div>

      <div className="user-group-filter-type">By Others:</div>
      <div className="user-groups">
        <div className="user-group">
          <div className="user-group-image">
            <img src={userPhoto6} alt="" />
          </div>
          <div className="user-group-name-tag">
            <h3 className="h-100">First Dates</h3>
            <small className="small-text">Education</small>
          </div>
        </div>

        <div className="user-group">
          <div className="user-group-image">
            <img src={userPhoto6} alt="" />
          </div>
          <div className="user-group-name-tag">
            <h3 className="h-100">First Dates</h3>
            <small className="small-text">Education</small>
          </div>
        </div>

        <div className="user-group">
          <div className="user-group-image">
            <img src={userPhoto6} alt="" />
          </div>
          <div className="user-group-name-tag">
            <h3 className="h-100">First Dates</h3>
            <small className="small-text">Education</small>
          </div>
        </div>
      </div>
      <div className="profile-see-all-groups-btn">
        <a href="#">See All</a>
      </div>
    </div>
  );
}
