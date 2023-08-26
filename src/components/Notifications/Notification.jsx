import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./notifications.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";

export default function Notification({
  notification,
  axiosInstance,
  setNotificationOpen,
}) {
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

  switch (notification.type) {
    case "friend_request":
      return (
        <div className="notification">
          <Link
            to={`/profile/${notification.sender}/`}
            onClick={() => setNotificationOpen(false)}
          >
            <div className="notification-user-image">
              <img
                src={
                  notificationSender.avatar
                    ? notificationSender.avatar
                    : noAvatar
                }
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
          </Link>
        </div>
      );

    case "accept_friend_request":
      return (
        <div className="notification">
          <Link
            to={`/profile/${notification.sender}/`}
            onClick={() => setNotificationOpen(false)}
          >
            <div className="notification-user-image">
              <img
                src={
                  notificationSender.avatar
                    ? notificationSender.avatar
                    : noAvatar
                }
                alt=""
              />
            </div>
            <div className="notification-content">
              <p className="text-body">{notification.message}</p>
            </div>
          </Link>
        </div>
      );

    case "group_request":
      return (
        <div className="notification">
          <Link
            to={`/profile/${notification.sender}/`}
            onClick={() => setNotificationOpen(false)}
          >
            <div className="notification-user-image">
              <img
                src={
                  notificationSender.avatar
                    ? notificationSender.avatar
                    : noAvatar
                }
                alt=""
              />
            </div>
            <div className="notification-content">
              <p className="text-body">{notification.message}</p>
            </div>
          </Link>
        </div>
      );

    case "group_request_accept":
      return (
        <div className="notification">
          <Link
            to={`/profile/${notification.sender}/`}
            onClick={() => setNotificationOpen(false)}
          >
            <div className="notification-user-image">
              <img
                src={
                  notificationSender.avatar
                    ? notificationSender.avatar
                    : noAvatar
                }
                alt=""
              />
            </div>
            <div className="notification-content">
              <p className="text-body">{notification.message}</p>
            </div>
          </Link>
        </div>
      );

    case "post_comment":
      return (
        <div className="notification">
          <Link
            to={`/posts/${notification.object_id}/`}
            onClick={() => setNotificationOpen(false)}
          >
            <div className="notification-user-image">
              <img
                src={
                  notificationSender.avatar
                    ? notificationSender.avatar
                    : noAvatar
                }
                alt=""
              />
            </div>
            <div className="notification-content">
              <p className="text-body">{notification.message}</p>
            </div>
          </Link>
        </div>
      );

    case "post_like":
      return (
        <div className="notification">
          <Link
            to={`/posts/${notification.object_id}/`}
            onClick={() => setNotificationOpen(false)}
          >
            <div className="notification-user-image">
              <img
                src={
                  notificationSender.avatar
                    ? notificationSender.avatar
                    : noAvatar
                }
                alt=""
              />
            </div>
            <div className="notification-content">
              <p className="text-body">{notification.message}</p>
            </div>
          </Link>
        </div>
      );

    case "post_share":
      return (
        <div className="notification">
          <Link
            to={`/posts/${notification.object_id}/`}
            onClick={() => setNotificationOpen(false)}
          >
            <div className="notification-user-image">
              <img
                src={
                  notificationSender.avatar
                    ? notificationSender.avatar
                    : noAvatar
                }
                alt=""
              />
            </div>
            <div className="notification-content">
              <p className="text-body">{notification.message}</p>
            </div>
          </Link>
        </div>
      );

    default:
      return (
        <div className="notification">
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
          </div>
        </div>
      );
  }
}
