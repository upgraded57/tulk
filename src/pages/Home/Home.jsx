import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Axios/axiosInstance";
import { Userdata } from "../../data/Userdata";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

// styles
import "./home.css";

// components
import NewPeople from "../../components/newPeople/NewPeople";
import Friends from "../../components/Friends/Friends";
import Groups from "../../components/groups/Groups";
import MessageContacts from "../../components/MessageContacts/MessageContacts";
import CreatePost from "../../components/CreatePost/CreatePost";
import Newsreel from "../../components/Newsreel/Newsreel";
import Post from "../../components/Post/Post";
import ChatPopup from "../../components/ChatPopup/ChatPopup";
import Chat from "../../components/Chat/Chat";

import Navbar from "../../components/Navbar/Navbar";
import { getOnlineFriends } from "../../Axios/ApiCalls";
import UseFetchUserFriends from "../../Hooks/User/UseFetchUserFriends";

export default function Home() {
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

  // fetch posts
  const [posts, setPosts] = useState([]);
  const [postPagination, setPostPagination] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(null);
  const fetchPosts = async () => {
    await axiosInstance({
      url: `/posts/?page=${postPagination}`,
      method: "get",
    })
      .then((res) => {
        setPosts((prev) => {
          return [...prev, ...res.data.results];
        });
        setHasMorePosts(res.data.next);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [postPagination]);

  // fetch online friends
  // const [onlineFriends, setOnlineFriends] = useState([]);
  // useEffect(() => {
  //   getOnlineFriends(axiosInstance, user.user_id, setOnlineFriends);
  // }, [user.user_id]);

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

          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
            next={() => setPostPagination((prev) => prev + 1)}
            hasMore={hasMorePosts !== null ? true : false}
            loader={<h4>Loading...</h4>}
            endMessage={
              <div
                className="end-of-post-text"
                style={{ textAlign: "center", marginBlock: "20px" }}
              >
                <p>Thats all for now.</p>
              </div>
            }
          >
            {posts.map((post) => {
              return <Post post={post} key={post.id} />;
            })}
          </InfiniteScroll>
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
