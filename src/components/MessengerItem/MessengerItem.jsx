import React, { useState } from "react";

// styles
import "./messengerItem.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import useFetchProfile from "../../Hooks/User/useFetchProfile";

export default function MessengerItem({
  chat,
  setConversationActive,
  setConversation,
}) {
  // Set chat Header
  const [chatHeader, setChatHeader] = useState("Leanne Graham");

  const openConversation = () => {
    setConversationActive(true);
    setConversation(chat);
  };

  const { data: recipient } = useFetchProfile(chat.receiver);

  return (
    <div className="messenger-item" onClick={openConversation}>
      <div className="messenger-item-left">
        <div className="messenger-img">
          <img src={recipient?.avatar ? recipient.avatar : noAvatar} alt="" />
        </div>
        <div className="messenger-item-left-center">
          <div className="messenger-name">
            <h3 className="h-100">{`${recipient?.first_name} ${recipient?.last_name}`}</h3>
            <div className="messenger-last-message">
              <p className="text-body">{chat?.catchPhrase}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="messenger-item-right">
        <div className="messenger-last-message-time">
          <small className="small-text"> 11:55pm </small>
        </div>
        <div className="messenger-unread-message-count">2</div>
      </div>
    </div>
  );
}
