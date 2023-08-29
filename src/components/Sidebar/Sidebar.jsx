import React from "react";
import { useDispatch } from "react-redux";
import { Userdata } from "../../data/Userdata";

// styles
import "./sidebar.css";

// icons
import notifBell from "../../images/icons/notif-bell.png";
import groupIconOutline from "../../images/icons/group-icon-outline.png";
import profileIconOutline from "../../images/icons/profile-icon-outline.png";
import adminImg from "../../images/icons/admin.svg";

// utils
import { Link, useNavigate } from "react-router-dom";

// logout user function caller
import { logoutUser } from "../../Store/Auth/Action/AuthActions";

const Sidebar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  // log current user out
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("tokens");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // user data
  const user = Userdata();

  return (
    <div className="sidebar-bg">
      <div
        className="sidebar-overlay"
        onClick={() => setSidebarOpen((prev) => !prev)}
      ></div>
      <div className="sidebar">
        <Link
          to={`/profile/${user.user_id}`}
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
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

        <div className="sidebar-links">
          <Link to="/friends" onClick={() => setSidebarOpen((prev) => !prev)}>
            <div className="sidebar-link">
              <img src={profileIconOutline} alt="" />
              <p className="text-body"> Friends </p>
            </div>
          </Link>
          <Link to="/groups" onClick={() => setSidebarOpen((prev) => !prev)}>
            <div className="sidebar-link">
              <img src={groupIconOutline} alt="" />
              <p className="text-body"> Groups </p>
            </div>
          </Link>
          <Link
            to="/notifications"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <div className="sidebar-link">
              <img src={notifBell} alt="" />
              <p className="text-body"> Notifications </p>
            </div>
          </Link>
          {user.is_staff && (
            <Link to="/admin" onClick={() => setSidebarOpen((prev) => !prev)}>
              <div className="sidebar-link">
                <img src={adminImg} alt="" style={{ opacity: "0.6" }} />
                <p className="text-body">Admin</p>
              </div>
            </Link>
          )}
        </div>

        <div
          className="logout-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <Link to="/login">
            <button className="btn-secondary" onClick={logout}>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
