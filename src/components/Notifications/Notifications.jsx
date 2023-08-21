import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Axios/axiosInstance";

// styles
import "./notifications.css";

// icons
import { IoIosClose } from "react-icons/io";
import notifBell from "../../images/icons/notif-bell.png";

import Navbar from "../Navbar/Navbar";
import Notification from "./Notification";

export default function Notifications({ desktop, setNotificationOpen }) {
  const [loadingFetchNotification, setLoadingFetchNotification] =
    useState(false);
  const [notifications, setNotifications] = useState([]);
  // const authAxios = axiosInstance();
  const notificationPageCount = 1;
  const getNotifications = async () => {
    setLoadingFetchNotification(true);
    await axiosInstance({
      method: "get",
      url: `https://tulk-social-f7f4f4c56190.herokuapp.com/notifications/?page=${notificationPageCount}`,
    })
      .then((res) => {
        setNotifications(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingFetchNotification(false);
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);

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
        ) : notifications.length == 0 ? (
          <div className="notif-loader">There's nothing to see here yet</div>
        ) : (
          <>
            {notifications.map((notification) => {
              return (
                <Notification
                  notification={notification}
                  key={notification.id}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
