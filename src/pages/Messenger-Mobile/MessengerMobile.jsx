import "../Messenger/messenger.css";
import Navbar from "./../../components/Navbar/Navbar";
import UseFetchConversations from "../../Hooks/Chat/UseFetchConversations";

import { FiSearch } from "react-icons/fi";
import Loader from "./../../components/Loader/Loader";
import MessengerItem from "../../components/MessengerItem/MessengerItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MessengerMobile() {
  const [conversation, setConversation] = useState(null);
  const [conversationActive, setConversationActive] = useState(false);

  const { isLoading: loading, data: chats } = UseFetchConversations();
  console.log(chats);
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
                  mobile
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
