import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import NewPeople from "../newPeople/NewPeople";
import Friends from "../Friends/Friends";
import Groups from "../groups/Groups";
import MessageContacts from "../MessageContacts/MessageContacts";
import ChatPopup from "../ChatPopup/ChatPopup";
import CreatePost from "../CreatePost/CreatePost";
import Newsreel from "../Newsreel/Newsreel";
import { Userdata } from "../../data/Userdata";
import Chat from "../Chat/Chat";

import "../../pages/Home/home.css";
import IndividualNews from "./IndividualNews";
import { axiosInstance } from "../../Axios/axiosInstance";

export default function ArticleModal() {
  const { article_id } = useParams();
  const user = Userdata();
  const [article, setArticle] = useState({});
  const getArticle = async () => {
    await axiosInstance({
      method: "get",
      url: `/articles/${article_id}`,
    })
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getArticle();
  }, []);

  // variable to store state of chat Modal whether active or not
  const [showChatModal, setShowChatModal] = useState(false);

  // function to switch feed
  const [feedsSwitched, setFeedsSwitched] = useState(true);
  const switchFeed = () => {
    document.getElementById("toggleFeed").classList.toggle("active");
    setFeedsSwitched(!feedsSwitched);
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-left">
          <div className="home-left-profile-link">
            <Link to={`/profile/${user.user_id}`}>
              <img src={user.avatar} alt="" />
              <h3 className="h-100">{user.fullname}</h3>
            </Link>
          </div>
          <NewPeople />
          <Friends />
          <Groups />
          <MessageContacts />
          <ChatPopup />
        </div>
        <div className={feedsSwitched ? "home-center" : "home-right"}>
          {showChatModal && (
            <Chat setShowChatModal={setShowChatModal} chatModal />
          )}
          {/* <Stories /> */}
          {/* <CreatePost /> */}

          <IndividualNews article={article} />
        </div>
        <div className="home-right-toggle-feed">
          <div className="toggle-feed" id="toggleFeed" onClick={switchFeed}>
            <p className="body-text">Switch Feed</p>
            <div className="feed-toggler-container">
              <div className="feed-toggler-thumb"></div>
            </div>
          </div>
        </div>
        <div className={feedsSwitched ? "home-right" : "home-center"}>
          <Newsreel feedsSwitched={feedsSwitched} />
        </div>
      </div>
    </>
  );
}
