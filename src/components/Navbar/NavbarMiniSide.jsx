import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Userdata } from "../../data/Userdata";

// style
import "./navbar.css";

// images
import adminImg from "../../images/icons/admin.svg";

export const NavbarMiniSide = () => {
  const user = Userdata();

  const navigate = useNavigate();
  const logout = () => {
    // dispatch(logoutUser());
    localStorage.removeItem("tokens");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="navbar-mini-sidebar">
      <Link to={`/profile/${user.user_id}`}>
        <div className="profile-link">
          <div className="profile-link-user-image">
            <img src={user.avatar} alt="" />
          </div>

          <div className="profile-link-display-name">
            <h3 className="h-100">{user.fullname}</h3>
            <small className="small-text">My Profile</small>
          </div>
        </div>
      </Link>

      {user.is_staff && (
        <Link to={`/admin/`}>
          <div className="admin-link">
            <img src={adminImg} alt="" />
            <p className="text-body">Admin</p>
          </div>
        </Link>
      )}
      <Link to="/login">
        <button className="btn-secondary" onClick={logout}>
          Logout
        </button>
      </Link>
    </div>
  );
};
