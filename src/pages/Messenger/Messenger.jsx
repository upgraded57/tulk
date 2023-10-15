// utils
import React, { useState } from "react";

// components
import Chat from "../../components/Chat/Chat";

// styles
import "./messenger.css";

// components
import MessengerItem from "../../components/MessengerItem/MessengerItem";

import Navbar from "../../components/Navbar/Navbar";
import UseFetchConversations from "./../../Hooks/Chat/UseFetchConversations";
import { FiSearch } from "react-icons/fi";

export default function Messenger() {
  const [conversation, setConversation] = useState(null);
  const [conversationActive, setConversationActive] = useState(false);

  const { data: chats } = UseFetchConversations();
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="messenger-titles">
          <div className="search-conversation">
            <form>
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search a conversation..." />
            </form>
          </div>
          {chats?.map((chat) => {
            return (
              <MessengerItem
                key={chat.receiver}
                chat={chat}
                setConversationActive={setConversationActive}
                setConversation={setConversation}
              />
            );
          })}
        </div>
        {conversationActive ? (
          <div className="messages">
            <Chat recipient={conversation.receiver} />
          </div>
        ) : (
          <div className="empty-conversation">
            <h1>Click on a user to start a conversation with them</h1>
          </div>
        )}
      </div>
    </>
  );
}
