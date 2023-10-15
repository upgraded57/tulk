import React, { useState } from "react";

// styles
import "./chat.css";

// icons
import { MdPermMedia } from "react-icons/md";
import { RiAttachment2 } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";

// images
import UseFetchMessages from "../../Hooks/Chat/UseFetchMessages";
import useFetchProfile from "../../Hooks/User/useFetchProfile";
import moment from "moment/moment";
import { Userdata } from "../../data/Userdata";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function Chat({ setShowChatModal, chatModal, recipient }) {
  const user = Userdata();
  // Function to close chat
  const closeChat = () => {
    setShowChatModal(false);
  };

  const { data: messages } = UseFetchMessages(recipient);

  const { data: converser } = useFetchProfile(recipient);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const message_object = new FormData();
    message_object.append("sender", user.user_id);
    message_object.append("receiver", recipient);
    message_object.append("message_content", newMessage);
    console.log(newMessage);

    // await axiosInstance({
    //   method: "post",
    //   url: "/send-message/",
    //   data: message_object,
    // })
    //   .then((res) => {
    //     console.log(res);
    //     setNewMessage("");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className={chatModal ? "chatModal-chat-box" : "fullscreen-chat-box"}>
      <div className="chat-head">
        <div className="chat-head-img">
          <img src={converser?.avatar} alt="" />
        </div>
        <h3 className="h-100">{`${converser?.first_name} ${converser?.last_name}`}</h3>
        {chatModal && (
          <div className="chat-close-btn" onClick={closeChat}>
            <IoIosClose />
          </div>
        )}
      </div>

      <div className="chat-body">
        <div className="chat-body-messages">
          {messages?.map((message, index) =>
            message.sender === recipient ? (
              <div className="message received" key={index}>
                <div className="chat-body">
                  <p className="text-body">{message.message_content}</p>
                  {message.files.length > 0 &&
                    message.files.map((file) => (
                      <div className="media" key={file.id}>
                        <img src={file.file} alt="" />
                      </div>
                    ))}
                </div>
                <small className="message-time">
                  {moment(message.timestamp).fromNow()}
                </small>
              </div>
            ) : (
              <div className="message sent" key={index}>
                <div className="chat-body">
                  <p className="text-body">{message.message_content}</p>
                  {message.files.length > 0 &&
                    message.files.map((file) => (
                      <div className="media" key={file.id}>
                        <img src={file.file} alt="" />
                      </div>
                    ))}
                </div>
                <small className="message-time">
                  {moment(message.timestamp).fromNow()}
                </small>
              </div>
            )
          )}
        </div>
        <div className="chatbox-bottom">
          <form onSubmit={sendMessage}>
            <div className="chat-body-text-input">
              <textarea
                rows="3"
                placeholder="Write Message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="chat-body-actions">
              <div className="chat-body-media-input">
                <MdPermMedia className="chat-body-icon" />
                <RiAttachment2 className="chat-body-icon" />
              </div>
              <button className="chat-body-send-btn btn-solid">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
