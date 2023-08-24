import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./notifications.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";

export default function Notification({ notification, axiosInstance }) {
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

  console.log(notification);

  return (
    <div className="notification">
      <>
        <Link to={`/posts/${notification.object_id}/`}>
          <div className="notification-user-image">
            <img
              src={
                notificationSender.avatar ? notificationSender.avatar : noAvatar
              }
              alt=""
            />
          </div>
          <div className="notification-content">
            <p className="text-body">{notification.message}</p>
            {notification.message.includes("sent you a friend request") && (
              <div className="notification-action-btns">
                <button className="accept">Accept</button>
                <button className="reject">Reject</button>
              </div>
            )}
          </div>
        </Link>
      </>
    </div>
  );
}
