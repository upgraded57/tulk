import React, { useEffect, useState } from "react";
import "./notifications.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function Notification({ notification }) {
  const [notificationSender, setNotificationSender] = useState({});
  const getNotificationSender = async () => {
    await axiosInstance({
      method: "get",
      url: `/userprofiles/${notification.sender}/`,
    })
      .then((res) => {
        setNotificationSender(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNotificationSender();
  }, [notification]);

  return (
    <div className="notification">
      <div className="notification-user-image">
        <img
          src={notificationSender.avatar ? notificationSender.avatar : noAvatar}
          alt=""
        />
      </div>
      <div className="notification-content">
        <p className="text-body">{notification.message}</p>
        <div className="notification-action-btns">
          <button className="accept">Accept</button>
          <button className="reject">Reject</button>
        </div>
      </div>
    </div>
  );
}
