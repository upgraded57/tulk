import React from "react";
import { Link } from "react-router-dom";

// styles
import "./groups.css";

// images
import newPerson1 from "../../images/Frame 76.png";
import newPerson2 from "../../images/Frame 85.png";
import newPerson3 from "../../images/Frame 86.png";

export default function Groups() {
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

      <div className="groups">
        <div className="group">
          <img src={newPerson2} alt="" />
        </div>
        <div className="group">
          <img src={newPerson1} alt="" />
        </div>
        <div className="group">
          <img src={newPerson3} alt="" />
        </div>
      </div>
    </div>
  );
}
