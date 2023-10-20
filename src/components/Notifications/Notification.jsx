import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./notifications.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import {
  acceptFriendRequest,
  deleteFriendRequest,
} from "./../../Axios/ApiCalls";
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

  console.log(notification);

  switch (notification.type) {
    case "friend_request":
      return (
        <div className="notification">
          <Link to={`/profile/${notification.sender}/`}>
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
          </Link>
          <div className="notification-content">
            <p className="text-body">{notification.message}</p>
            <div className="notification-action-btns">
              <button
                className="accept"
                onClick={() =>
                  acceptFriendRequest(axiosInstance, notification.id)
                }
              >
                Accept
              </button>
              <button
                className="reject"
                onClick={() =>
                  deleteFriendRequest(axiosInstance, notification.id)
                }
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      );

    case "accept_friend_request":
      return (
        <div className="notification">
          <Link to={`/profile/${notification.sender}/`}>
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
          <Link to={`/profile/${notification.sender}/`}>
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
          <Link to={`/profile/${notification.sender}/`}>
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
          <Link to={`/posts/${notification.object_id}/`}>
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
          <Link to={`/posts/${notification.object_id}/`}>
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
          <Link to={`/posts/${notification.object_id}/`}>
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
