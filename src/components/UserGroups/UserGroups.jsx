import React from "react";

// styles
import "./userGroups.css";
import { useNavigate } from "react-router-dom";

export default function UserGroups({ groups }) {
  const navigate = useNavigate();
  return (
    <div className="user-groups-div">
      {groups?.length === 0 && <p>No group to display yet</p>}
      <div className="user-groups">
        {groups && groups[0] && (
          <div
            className="user-group"
            onClick={() => navigate("/groups/" + groups[0].id)}
          >
            <div className="user-group-image">
              <img src={groups[0].avatar} alt="" />
            </div>
            <div className="user-group-name-tag">
              <h3 className="h-100">{groups[0].name}</h3>
              <small className="small-text">{groups[0].category}</small>
            </div>
          </div>
        )}

        {groups && groups[1] && (
          <div
            className="user-group"
            onClick={() => navigate("/groups/" + groups[1].id)}
          >
            <div className="user-group-image">
              <img src={groups[1].avatar} alt="" />
            </div>
            <div className="user-group-name-tag">
              <h3 className="h-100">{groups[1].name}</h3>
              <small className="small-text">{groups[1].category}</small>
            </div>
          </div>
        )}

        {groups && groups[2] && (
          <div
            className="user-group"
            onClick={() => navigate("/groups/" + groups[2].id)}
          >
            <div className="user-group-image">
              <img src={groups[2].avatar} alt="" />
            </div>
            <div className="user-group-name-tag">
              <h3 className="h-100">{groups[2].name}</h3>
              <small className="small-text">{groups[2].category}</small>
            </div>
          </div>
        )}

        {groups && groups[3] && (
          <div
            className="user-group"
            onClick={() => navigate("/groups/" + groups[3].id)}
          >
            <div className="user-group-image">
              <img src={groups[3].avatar} alt="" />
            </div>
            <div className="user-group-name-tag">
              <h3 className="h-100">{groups[3].name}</h3>
              <small className="small-text">{groups[3].category}</small>
            </div>
          </div>
        )}

        {groups && groups[4] && (
          <div
            className="user-group"
            onClick={() => navigate("/groups/" + groups[4].id)}
          >
            <div className="user-group-image">
              <img src={groups[4].avatar} alt="" />
            </div>
            <div className="user-group-name-tag">
              <h3 className="h-100">{groups[4].name}</h3>
              <small className="small-text">{groups[4].category}</small>
            </div>
          </div>
        )}

        {groups && groups[5] && (
          <div
            className="user-group"
            onClick={() => navigate("/groups/" + groups[5].id)}
          >
            <div className="user-group-image">
              <img src={groups[5].avatar} alt="" />
            </div>
            <div className="user-group-name-tag">
              <h3 className="h-100">{groups[5].name}</h3>
              <small className="small-text">{groups[5].category}</small>
            </div>
          </div>
        )}

        {groups && groups[6] && (
          <div
            className="user-group"
            onClick={() => navigate("/groups/" + groups[6].id)}
          >
            <div className="user-group-image">
              <img src={groups[6].avatar} alt="" />
            </div>
            <div className="user-group-name-tag">
              <h3 className="h-100">{groups[6].name}</h3>
              <small className="small-text">{groups[6].category}</small>
            </div>
          </div>
        )}

        {groups && groups[7] && (
          <div
            className="user-group"
            onClick={() => navigate("/groups/" + groups[7].id)}
          >
            <div className="user-group-image">
              <img src={groups[7].avatar} alt="" />
            </div>
            <div className="user-group-name-tag">
              <h3 className="h-100">{groups[7].name}</h3>
              <small className="small-text">{groups[7].category}</small>
            </div>
          </div>
        )}

        {groups && groups[8] && (
          <div
            className="user-group"
            onClick={() => navigate("/groups/" + groups[8].id)}
          >
            <div className="user-group-image">
              <img src={groups[8].avatar} alt="" />
            </div>
            <div className="user-group-name-tag">
              <h3 className="h-100">{groups[8].name}</h3>
              <small className="small-text">{groups[8].category}</small>
            </div>
          </div>
        )}
      </div>
      {groups?.length > 9 && (
        <div className="profile-see-all-groups-btn">
          <a href="#">See All</a>
        </div>
      )}
    </div>
  );
}
