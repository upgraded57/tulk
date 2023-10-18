import { useParams } from "react-router-dom";
import "./conversation-page.css";
import "../Messenger/messenger.css";
import Navbar from "../../components/Navbar/Navbar";
import Chat from "../../components/Chat/Chat";

export default function Conversation() {
  const { conversationId } = useParams();
  return (
    <>
      <div
        className="chat-page"
        style={{
          marginTop: "-120px",
          position: "relative",
          minHeight: "100dvh",
        }}
      >
        <div className="messages">
          <Chat recipient={conversationId} mobile />
        </div>
      </div>
    </>
  );
}
