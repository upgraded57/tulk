import React from "react";

// styles
import "./chatPopup.css";

// icons
import { BsChevronCompactDown, BsSearch } from "react-icons/bs";

// images
import onlineFriendImg from "../../images/Frame 89.png";
import { useSelector } from "react-redux";

export default function ChatPopup() {
  // function to toggle chat popup body
  const toggleChatPopupBody = () => {
    document.getElementById("chatPopupBody").classList.toggle("active");
  };

  // select current user
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <div className="chat-popup mt-lg">
      <div className="chat-popup-header" onClick={toggleChatPopupBody}>
        <p className="h-100">Chat</p>
        <BsChevronCompactDown />
      </div>

      <div className="chat-popup-body" id="chatPopupBody">
        <div className="chat-popup-body-search">
          <BsSearch className="chat-popup-body-search-icon" />
          <input type="text" />
        </div>
        <ul className="chat-popup-body-friends-list">
          <li>
            <img src={onlineFriendImg} alt="" />
            <p className="text-body">Online Friend</p>
          </li>
          <li>
            <img src={onlineFriendImg} alt="" />
            <p className="text-body">Online Friend</p>
          </li>
          <li>
            <img src={onlineFriendImg} alt="" />
            <p className="text-body">Online Friend</p>
          </li>
          <li>
            <img src={onlineFriendImg} alt="" />
            <p className="text-body">Online Friend</p>
          </li>
          <li>
            <img src={onlineFriendImg} alt="" />
            <p className="text-body">Online Friend</p>
          </li>
          <li>
            <img src={onlineFriendImg} alt="" />
            <p className="text-body">Online Friend</p>
          </li>
          <li>
            <img src={onlineFriendImg} alt="" />
            <p className="text-body">Online Friend</p>
          </li>
          <li>
            <img src={onlineFriendImg} alt="" />
            <p className="text-body">Online Friend</p>
          </li>
          <li>
            <img src={onlineFriendImg} alt="" />
            <p className="text-body">Online Friend</p>
          </li>
          <li>
            <img src={onlineFriendImg} alt="" />
            <p className="text-body">Online Friend</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
