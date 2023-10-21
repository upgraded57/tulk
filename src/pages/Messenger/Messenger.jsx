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
import Loader from "./../../components/Loader/Loader";
import { Userdata } from "../../data/Userdata";

export default function Messenger() {
  const user = Userdata();
  const [conversation, setConversation] = useState(null);
  const [conversationActive, setConversationActive] = useState(false);

  const { isLoading: loading, data: chats } = UseFetchConversations();
  console.log(conversation);

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
          {loading ? (
            <Loader type="list" />
          ) : !chats ? (
            <p style={{ padding: "20px" }}> No recent chats to display </p>
          ) : (
            chats?.map((chat) => {
              return (
                <MessengerItem
                  key={chat.participant2}
                  chat={chat}
                  setConversationActive={setConversationActive}
                  setConversation={setConversation}
                />
              );
            })
          )}
        </div>
        {conversationActive ? (
          <div className="messages">
            <Chat
              recipient={
                conversation.participant2 === user.user_id
                  ? conversation.participant1
                  : conversation.participant2
              }
            />
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
