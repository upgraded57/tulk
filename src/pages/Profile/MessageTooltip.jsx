import React, { useState } from "react";
import "./profile.css";
import { axiosInstance } from "../../Axios/axiosInstance";
import toast from "react-hot-toast";

export default function MessageTooltip({ sender, recipient }) {
  const [msg, setMsg] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const message_object = new FormData();
    message_object.append("sender", sender);
    message_object.append("receiver", recipient);
    message_object.append("message_content", msg);

    const toastId = toast.loading("Sending message");

    await axiosInstance({
      method: "post",
      url: "/send-message/",
      data: message_object,
    })
      .then((res) => {
        console.log(res.data);
        setMsg("");
        toast.success("Message sent", {
          id: toastId,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to send message", {
          id: toastId,
        });
      });
  };
  return (
    <div className="message-tooltip">
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit" className="btn-solid">
          Send
        </button>
      </form>
    </div>
  );
}
