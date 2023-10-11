import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Post from "./Post";
import { getOnlineFriends, getSinglePost } from "../../Axios/ApiCalls";
import "./post.css";
import "../../pages/Home/home.css";
import NewPeople from "../newPeople/NewPeople";
import Friends from "../Friends/Friends";
import Groups from "../groups/Groups";
import MessageContacts from "../MessageContacts/MessageContacts";
import ChatPopup from "../ChatPopup/ChatPopup";
import { Userdata } from "../../data/Userdata";
import Chat from "../Chat/Chat";
import CreatePost from "../CreatePost/CreatePost";
import Newsreel from "../Newsreel/Newsreel";
import { axiosInstance } from "../../Axios/axiosInstance";
import UseFetchUserFriends from "../../Hooks/User/UseFetchUserFriends";

export default function PostModal() {
  const { post_id } = useParams();
  const [post, setPost] = useState({});

  //fetch post
  useEffect(() => {
    getSinglePost(axiosInstance, post_id, setPost);
  }, [post_id]);

  // current user
  const user = Userdata();

  // variable to store state of chat Modal whether active or not
  const [showChatModal, setShowChatModal] = useState(false);

  // function to switch feed
  const [feedsSwitched, setFeedsSwitched] = useState(true);
  const switchFeed = () => {
    document.getElementById("toggleFeed").classList.toggle("active");
    setFeedsSwitched(!feedsSwitched);
  };

  // fetch online friends
  const [pagenum, setPagenum] = useState(1);

  const { data: onlineFriends } = UseFetchUserFriends(user.user_id);

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
          <CreatePost />

          <Post post={post} />
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
