import React, { useState } from "react";

// styles
import "./messengerItem.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import useFetchProfile from "../../Hooks/User/useFetchProfile";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Userdata } from "../../data/Userdata";

export default function MessengerItem({
  chat,
  setConversationActive,
  setConversation,
  mobile,
}) {
  const user = Userdata();
  const navigate = useNavigate();
  // Set chat Header
  const [chatHeader, setChatHeader] = useState("");

  const openConversation = () => {
    setConversationActive(true);
    setConversation(chat);
  };

  const recipientId =
    chat.participant2 === user.user_id ? chat.participant1 : chat.participant2;

  const { data: recipient } = useFetchProfile(recipientId);

  return (
    <div
      className="messenger-item"
      onClick={mobile ? () => navigate(`${recipientId}`) : openConversation}
    >
      <div className="messenger-item-left">
        <div className="messenger-img">
          <img src={recipient?.avatar ? recipient.avatar : noAvatar} alt="" />
        </div>
        <div className="messenger-item-left-center">
          <div className="messenger-name">
            <h3 className="h-100">
              {recipient
                ? `${recipient?.first_name} ${recipient?.last_name}`
                : "Loading..."}
            </h3>
            <div className="messenger-last-message">
              <p className="text-body">{chat?.last_message}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="messenger-item-right">
        <div className="messenger-last-message-time">
          <small className="small-text">
            {moment(chat?.timestamp).fromNow("dddd")}
          </small>
        </div>
      </div>
      {chat.status === "unread" && (
        <div className="unread-message-bubble"></div>
      )}
    </div>
  );
}
