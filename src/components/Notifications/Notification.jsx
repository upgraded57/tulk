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
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

export default function Notification({ notification, setNotificationOpen }) {
  const queryClient = useQueryClient();
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

  const setNotificationToViewed = async (id) => {
    await axiosInstance({
      method: "put",
      url: `/notifications/${id}/`,
      data: { viewed: "true" },
    })
      .then(() => {
        queryClient.invalidateQueries("Notifications");
        setNotificationOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // accept friend request
  const acceptFriend = async (notification) => {
    await axiosInstance({
      method: "get",
      url: `/friend-requests/${notification.object_id}`,
    }).then((res) => {
      acceptFriendRequest(axiosInstance, res.data, queryClient);
      setNotificationToViewed(notification.id);
    });
  };

  // delete friend request
  const deleteFriend = async (notification) => {
    await axiosInstance({
      method: "get",
      url: `/friend-requests/${notification.object_id}`,
    }).then((res) => {
      deleteFriendRequest(axiosInstance, res.data, queryClient);
      setNotificationToViewed(notification.id);
    });
  };

  // accept group invite
  const acceptGroupInvite = async (notification) => {
    await axiosInstance({
      method: "post",
      url: `/groups/${notification.object_id}`,
      data: { is_accepted: true },
    })
      .then(() => {
        toast.success("Group invite accepted");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setNotificationToViewed(notification.id);
      });
  };

  // reject group invite
  const rejectGroupInvite = async (notification) => {
    await axiosInstance({
      method: "post",
      url: `/groups/${notification.object_id}`,
      data: { is_accepted: false },
    })
      .then(() => {
        toast.success("Group invite rejected");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setNotificationToViewed(notification.id);
      });
  };

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
            {notification.viewed === false && (
              <div className="notification-action-btns">
                <button
                  className="Accept"
                  onClick={() => acceptFriend(notification)}
                >
                  Accept
                </button>
                <button
                  className="Reject"
                  onClick={() => deleteFriend(notification)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      );

    case "accept_friend_request":
      return (
        <div className="notification">
          <Link
            to={`/profile/${notification.sender}/`}
            onClick={() => setNotificationToViewed(notification.id)}
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
            {notification.viewed === false && (
              <div className="notification-action-btns">
                <button
                  className="Accept"
                  onClick={() => acceptGroupInvite(notification)}
                >
                  Accept
                </button>
                <button
                  className="Reject"
                  onClick={() => rejectGroupInvite(notification)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      );

    case "group_request_accept":
      return (
        <div className="notification">
          <Link
            to={`/profile/${notification.sender}/`}
            onClick={() => setNotificationToViewed(notification.id)}
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
            onClick={() => setNotificationToViewed(notification.id)}
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
            onClick={() => setNotificationToViewed(notification.id)}
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
            onClick={() => setNotificationToViewed(notification.id)}
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
        <div
          className="notification"
          onClick={() => setNotificationToViewed(notification.id)}
        >
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
