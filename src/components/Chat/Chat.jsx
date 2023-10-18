import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { axiosInstance } from "../../Axios/axiosInstance";

// styles
import "./chat.css";

// icons
import { MdPermMedia } from "react-icons/md";
import { RiAttachment2 } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";

// hooks
import UseFetchMessages from "../../Hooks/Chat/UseFetchMessages";
import useFetchProfile from "../../Hooks/User/useFetchProfile";
import moment from "moment/moment";
import { Userdata } from "../../data/Userdata";

export default function Chat({ setShowChatModal, chatModal, recipient }) {
  const user = Userdata();
  // Function to close chat
  const closeChat = () => {
    setShowChatModal(false);
  };

  const queryClient = useQueryClient();

  const [sendMessageLoading, setSendMessageLoading] = useState(false);

  const { data: messages } = UseFetchMessages(recipient);

  const { data: converser } = useFetchProfile(recipient);

  // file upload
  const handleMediaUpload = () => {
    const uploadFileInput = document.getElementById("sendFile");

    // Temporarily show image to be uploaded
    for (const file of uploadFileInput.files) {
      // Temporarily show image to be uploaded
      const tempImg = document.createElement("img");
      tempImg.src = URL.createObjectURL(file);
      const tempImgContainer = document.createElement("span");
      tempImgContainer.classList.add("chatbox-image");
      tempImgContainer.appendChild(tempImg);
      document.querySelector(".chatbox-images").appendChild(tempImgContainer);
    }

    // delete temporarily uploaded image
    const tempImages = document.querySelectorAll(".chatbox-image");
    tempImages.forEach((tempImage) => {
      tempImage.addEventListener("click", () => {
        document.querySelector(".chatbox-images").removeChild(tempImage);
      });
    });
  };

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    setSendMessageLoading(true);
    const uploadFileInput = document.getElementById("sendFile");
    const message_object = new FormData();
    message_object.append("sender", user.user_id);
    message_object.append("receiver", recipient);
    message_object.append("message_content", newMessage);
    Array.from(uploadFileInput.files).forEach((file) => {
      return message_object.append("uploaded_files", file);
    });

    await axiosInstance({
      method: "post",
      url: "/send-message/",
      data: message_object,
    })
      .then((res) => {
        setNewMessage("");
        // clear sent media files
        document.getElementById("sendFile").value = null;
        const tempImages = document.querySelectorAll(".chatbox-image");
        if (tempImages) {
          const tempImgContainer = document.querySelector(".chatbox-images");
          tempImages.forEach((image) => tempImgContainer.removeChild(image));
        }

        queryClient.invalidateQueries({ queryKey: ["Messages", recipient] });
        queryClient.invalidateQueries({ queryKey: "Conversations" });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSendMessageLoading(false);
      });
  };

  const messageScreen = document.querySelector(".chat-container-messages");

  useEffect(() => {
    messageScreen && messageScreen.lastElementChild.scrollIntoView();
  }, [messages]);

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

      <div className="chat-container">
        <div className="chat-container-messages">
          {sendMessageLoading && (
            <div className="sending-message-screen">
              <span className="sending-message-screen-loader"></span>
            </div>
          )}
          {messages?.map((message, index) =>
            message.sender === recipient ? (
              <div
                className={
                  sendMessageLoading
                    ? "message received fade"
                    : "message received"
                }
                key={index}
              >
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
              <div
                className={
                  sendMessageLoading ? "message sent fade" : "message sent"
                }
                key={index}
              >
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
                <input
                  type="file"
                  name=""
                  id="sendFile"
                  style={{ display: "none" }}
                  accept=".jpg,.jpeg,.png,.gif"
                  multiple={true}
                  onChange={handleMediaUpload}
                />
                <label htmlFor="sendFile">
                  <MdPermMedia className="chat-body-icon" />
                </label>
                <RiAttachment2 className="chat-body-icon" />
              </div>
              <button
                className="chat-body-send-btn btn-solid"
                disabled={sendMessageLoading}
              >
                Send
              </button>
            </div>
            <div className="chatbox-images"></div>
          </form>
        </div>
      </div>
    </div>
  );
}
