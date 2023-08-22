import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// styles
import "./groups.css";

// images
import noGroupAvatar from "../../images/noGroupAvatar.jpg";
import { fetchUserGroups } from "../../Axios/ApiCalls";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    fetchUserGroups(setGroups);
  }, []);

  return (
    <div className="groupsDiv mt-lg">
      <div className="groups-header">
        <h3 className="h-100">My Groups</h3>
        <div className="load-more-groups">
          <Link to="/groups" className="text-body mt-xsm">
            View All
          </Link>
        </div>
      </div>

      {groups.length < 1 ? (
        <>
          <div className="mt-md"></div>
          <p>You haven't joined a group yet</p>
        </>
      ) : (
        <>
          <div className="groups">
            {groups[0] && (
              <div className="group">
                <img
                  src={groups[0].avatar ? groups[0].avatar : noGroupAvatar}
                  alt=""
                />
              </div>
            )}

            {groups[1] && (
              <div className="group">
                <img
                  src={groups[1].avatar ? groups[1].avatar : noGroupAvatar}
                  alt=""
                />
              </div>
            )}

            {groups[2] && (
              <div className="group">
                <img
                  src={groups[2].avatar ? groups[2].avatar : noGroupAvatar}
                  alt=""
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
