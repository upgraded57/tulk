import React from "react";

// styles
import "./notifications.css";

// utils
import Notifications from "./Notifications";

export default function NotificationPopup({
  setNotificationOpen,
  axiosInstance,
}) {
  return (
    <div className="notification-popup">
      <Notifications
        desktop
        setNotificationOpen={setNotificationOpen}
        axiosInstance={axiosInstance}
      />
    </div>
  );
}
