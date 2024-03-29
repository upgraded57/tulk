import React, { useEffect, useState } from "react";
import "./post.css";

// icons
import { IoIosClose } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { RiShareBoxFill } from "react-icons/ri";

// temp image
import { axiosInstance } from "../../Axios/axiosInstance";
import Comment from "./Comment";
import Like from "./Like";

export default function EngagementModal({
  post,
  setEngagementModal,
  group,
  postAuthorData,
}) {
  const [engagementToggle, setEngagementToggle] = useState("null");
  useEffect(() => {
    setEngagementToggle(document.querySelector(".engagement-modal-body"));
  }, []);

  const [toggleBtns, setToggleBtns] = useState([]);

  useEffect(() => {
    setToggleBtns(document.querySelectorAll(".engagement-modal-btns span"));
  }, []);

  if (toggleBtns[0]) {
    toggleBtns[0].onclick = () => {
      if (!toggleBtns[0].classList.contains("active")) {
        toggleBtns[0].classList.add("active");
      }
      if (toggleBtns[1].classList.contains("active")) {
        toggleBtns[1].classList.remove("active");
      }
    };
  }

  if (toggleBtns[1]) {
    toggleBtns[1].onclick = () => {
      if (!toggleBtns[1].classList.contains("active")) {
        toggleBtns[1].classList.add("active");
      }
      if (toggleBtns[0].classList.contains("active")) {
        toggleBtns[0].classList.remove("active");
      }
    };
  }

  // fetch post comments
  const [postComments, setPostComments] = useState([]);
  const [postCommentCount, setPostCommentCount] = useState([]);
  const fetchPostComments = async () => {
    await axiosInstance({
      method: "get",
      url:
        group === true
          ? `/group-posts/${post.id}/comments/`
          : `/posts/${post.id}/comments/`,
    })
      .then((res) => {
        setPostComments(res.data.results);
        setPostCommentCount(res.data.results.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPostComments();
  }, []);

  //fetch post likes
  const [postLikers, setPostLikers] = useState([]);
  const [postLikeCount, setPostLikeCount] = useState(0);
  const fetchPostLikes = async () => {
    await axiosInstance({
      method: "get",
      url:
        group === true
          ? `/group-posts/${post.id}/likes/?page=1`
          : `/posts/${post.id}/likes/?page=1`,
    })
      .then((res) => {
        setPostLikeCount(res.data.length);
        setPostLikers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPostLikes();
  }, [postLikeCount]);

  return (
    <>
      <div
        className="image-popup-backdrop"
        onClick={() => setEngagementModal(false)}
      ></div>
      <div className="engagement-modal">
        <div className="engagement-modal-top">
          <h3 className="h-100">
            Engagements on {postAuthorData.first_name}'s Post
          </h3>
          <span
            className="engagement-modal-close-btn"
            onClick={() => setEngagementModal(false)}
          >
            <IoIosClose />
          </span>
        </div>

        <div className="engagement-modal-btns">
          <span
            className="engagement-modal-like-toggle active"
            onClick={() => (engagementToggle.style.left = "0")}
          >
            <AiOutlineHeart />
            <p>({postLikeCount}) </p>
          </span>
          <span
            className="engagement-modal-comment-toggle"
            onClick={() => (engagementToggle.style.left = "-100%")}
          >
            <FaRegComment />
            <p>({postCommentCount})</p>
          </span>
        </div>

        <div className="engagement-modal-body">
          <div className="engament-likes">
            {postLikers.length < 1 && <p>No likes for this post yet</p>}
            {postLikers.map((liker) => {
              return <Like key={liker.id} liker={liker} />;
            })}
          </div>
          <div className="engament-comments">
            {postComments.length < 1 && <p>No comments on this post yet</p>}
            {postComments.map((comment) => {
              return (
                <Comment comment={comment} engagementModal key={comment.id} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
