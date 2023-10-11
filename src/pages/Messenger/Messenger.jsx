// utils
import React, { useState } from "react";

// components
import Chat from "../../components/Chat/Chat";

// styles
import "./messenger.css";

// components
import MessengerItem from "../../components/MessengerItem/MessengerItem";

import Navbar from "../../components/Navbar/Navbar";
import UseFetchChats from "./../../Hooks/UseFetchChats/UseFetchChats";

export default function Messenger() {
  const [conversation, setConversation] = useState(null);
  const [conversationActive, setConversationActive] = useState(false);

  const { data: chats } = UseFetchChats();
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="messenger-titles">
          {chats?.map((chat) => {
            return (
              <MessengerItem
                key={chat.id}
                chat={chat}
                setConversationActive={setConversationActive}
                setConversation={setConversation}
              />
            );
          })}
        </div>
        {conversationActive && (
          <div className="messages">
            <Chat conversation={conversation} />
          </div>
        )}
      </div>
    </>
  );
}
