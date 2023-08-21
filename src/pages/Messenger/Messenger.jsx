// utils
import React from "react";

// components
import Chat from "../../components/Chat/Chat";

// styles
import "./messenger.css";

// components
import MessengerItem from "../../components/MessengerItem/MessengerItem";

import { users } from "../../data/data";
import Navbar from "../../components/Navbar/Navbar";

export default function Messenger() {
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="messenger-titles">
          {users.map((user) => {
            return <MessengerItem key={user.id} user={user} />;
          })}
        </div>
        <div className="messages">
          <Chat />
        </div>
      </div>
    </>
  );
}
