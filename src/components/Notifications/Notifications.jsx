import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Axios/axiosInstance";

// styles
import "./notifications.css";

// icons
import { IoIosClose } from "react-icons/io";
import notifBell from "../../images/icons/notif-bell.png";

import Navbar from "../Navbar/Navbar";
import Notification from "./Notification";
import UseFetchNotifications from "./../../Hooks/Notifications/UseFetchNotifications";
import { Userdata } from "../../data/Userdata";

export default function Notifications({ desktop, setNotificationOpen }) {
  const user = Userdata();
  const { isLoading: loadingFetchNotification, data: notifications } =
    UseFetchNotifications();

  console.log(notifications);

  return (
    <>
      {!desktop && <Navbar />}

      <div className="notifications">
        <div className="notifications-header">
          <h3 className="h-100">Notifications</h3>
          {/* show bell in header on mobile */}
          {!desktop && <img src={notifBell} alt="" />}

          {desktop && (
            <div
              className="notification-close-btn"
              id="notificationCloseBtn"
              onClick={() => setNotificationOpen(false)}
            >
              <IoIosClose />
            </div>
          )}
        </div>

        {/* Show loader while notifications are being fetched */}
        {loadingFetchNotification ? (
          <div className="notif-loader"> Fetching notifications...</div>
        ) : notifications
            ?.filter((notification) => notification.viewed === false)
            ?.filter((notification) => notification.sender !== user.user_id)
            ?.length === 0 ? (
          <div className="notif-loader">There's nothing to see here yet</div>
        ) : (
          <>
            {notifications
              ?.filter((notification) => notification.viewed === false)
              ?.filter((notification) => notification.sender !== user.user_id)
              ?.map((notification) => {
                return (
                  <Notification
                    notification={notification}
                    key={notification.id}
                    setNotificationOpen={setNotificationOpen}
                  />
                );
              })}
          </>
        )}
      </div>
    </>
  );
}
