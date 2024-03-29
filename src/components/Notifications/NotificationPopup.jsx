import React from "react";

// styles
import "./notifications.css";

// utils
import Notifications from "./Notifications";

export default function NotificationPopup({
  axiosInstance,
  setNotificationOpen,
}) {
  return (
    <div className="notification-popup">
      <Notifications desktop setNotificationOpen={setNotificationOpen} />
    </div>
  );
}
