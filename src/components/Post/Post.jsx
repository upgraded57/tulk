import React, { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../../Axios/axiosInstance";
import { Link } from "react-router-dom";
import moment from "moment";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Lazy, Pagination, Navigation } from "swiper/modules";

// styles
import "./post.css";

// icons
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareBoxFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

// data
import { Userdata } from "../../data/Userdata";

// Hot toast
import toast from "react-hot-toast";
import Comment from "./Comment";
import { copyPostLink, deletePost } from "../../Axios/ApiCalls";
import ImagePopup from "./ImagePopup";

export default function Post({ post, group }) {
  // get post author data
  const [postAuthorData, setPostAuthorData] = useState({});
  // current user
  const user = Userdata();

  // check whether post is liked
  const [postIsLiked, setPostIsLiked] = useState(false);

  // times post is liked
  const [postLikeCount, setPostLikeCount] = useState(0);
  const [postLikers, setPostLikers] = useState([]);

  // like post
  const likePost = async () => {
    if (!postIsLiked) {
      setPostLikeCount((prev) => prev + 1);
      setPostIsLiked(true);
      axiosInstance({
        method: "post",
        url:
          group === true
            ? `/group-posts/${post.id}/like-toggle/`
            : `/posts/${post.id}/like/`,
      })
        .then(() => {
          toast.success(`You liked ${postAuthorData.first_name}'s post`);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Sorry, couldn't like post");
        });
    } else {
      setPostLikeCount((prev) => prev - 1);
      toast.error(`You disliked ${postAuthorData.first_name}'s post`);
      setPostIsLiked(false);
    }
  };

  //fetch post likes
  const fetchPostLikes = async () => {
    await axiosInstance({
      method: "get",
      url:
        group === true
          ? `/group-posts/${post.id}/likes/?page=1`
          : `/posts/${post.id}/likes/?page=1`,
    })
      .then((res) => {
        setPostLikeCount(res.data.results.length);
        setPostLikers(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPostLikes();
  }, [postLikeCount]);

  // get id of post likers to persist post like state
  const postLikersId = [];
  postLikers.forEach((postLiker) => {
    postLikersId.push(postLiker.user);
  });

  useEffect(() => {
    console.log(postLikersId);
    postLikersId.includes(user.user_id)
      ? setPostIsLiked(true)
      : setPostIsLiked(false);
  }, []);

  // fetch post
  const fetchPostAuthor = async () => {
    await axiosInstance({
      method: "get",
      url: `/userprofiles/${post.author}/`,
    })
      .then((res) => {
        setPostAuthorData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPostAuthor();
  }, []);

  // make comment box active when comment button is selected
  const commentBoxRef = useRef();

  const activateCommentBox = () => {
    commentBoxRef.current.focus();
  };

  // times post is commented
  const [postCommentCount, setPostCommentCount] = useState(0);

  // Publish post comment
  const publishPostComment = async (e) => {
    const toastId = toast.loading("Publishing comment");
    e.preventDefault();
    if (commentBoxRef.current.value.trim() !== "") {
      await axiosInstance({
        method: "post",
        url:
          group === true
            ? `/group-posts/${post.id}/comments/`
            : `/posts/${post.id}/comments/`,
        data: {
          content: commentBoxRef.current.value,
          user: user.user_id,
          post: post.id,
        },
      })
        .then(() => {
          toast.success(
            `You commented on ${postAuthorData.first_name}'s post`,
            {
              id: toastId,
            }
          );
          commentBoxRef.current.value = "";
          setPostCommentCount((prev) => prev + 1);
        })
        .catch(() => {
          toast.error(`Unable to publish comment`, {
            id: toastId,
          });
        });
    } else {
      toast.error("Cannot make an empty comment", {
        id: toastId,
      });
    }
  };

  // fetch post comments
  const [postComments, setPostComments] = useState([]);
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

  // visible comments
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(1);

  useEffect(() => {
    fetchPostComments();
  }, [postComments]);

  // post actions toggle
  const [postActions, setPostActions] = useState(false);

  // image popup
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [imgFile, setImgFile] = useState("");

  return (
    <>
      <div className="postDiv">
        <div className="post">
          <div className="post-head">
            <Link to={`/profile/${post.author}/`}>
              <div className="poster-image">
                <img src={postAuthorData.avatar} alt="" />
              </div>
            </Link>
            {postAuthorData.first_name && (
              <div className="poster-name">
                <Link to={`/profile/${post.author}/`}>
                  <h3 className="h-100">{`${postAuthorData.first_name} ${postAuthorData.last_name}`}</h3>
                </Link>
                <small>{moment(post.created_at).fromNow()}</small>
              </div>
            )}

            <div className="post-action-btns">
              <BsThreeDotsVertical
                className="post-action-btn-icon"
                onClick={() => setPostActions(!postActions)}
              />
              {postActions && (
                <div className="post-actions">
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      copyPostLink(post.id, group);
                      setPostActions(false);
                    }}
                  >
                    Copy Post Link
                  </button>
                  {post.author === user.user_id && (
                    <button
                      className="btn-secondary delete-post"
                      onClick={() => deletePost(post.id)}
                    >
                      Delete Post
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <Swiper
            lazy="true"
            navigation={true}
            pagination={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {post.files?.map((imgFile) => {
              return (
                <SwiperSlide
                  className="post-img"
                  key={imgFile.id}
                  onClick={() => {
                    setImgFile(imgFile.file);
                    setShowImagePopup(true);
                  }}
                >
                  <img src={imgFile.file} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="post-desc">
            <p className="text-body">{post.content}</p>
          </div>
          <div className="post-action">
            <div className="post-like-comment">
              <div className="post-like-comment-btn">
                <AiFillHeart
                  className="post-like-icon"
                  style={postIsLiked ? { color: "#b4042a" } : ""}
                />
                <p className="text-body">{postLikeCount}</p>
              </div>

              <div className="post-like-comment-btn">
                <FaRegComment className="post-like-icon" />
                <p className="text-body">{postCommentCount}</p>
              </div>
            </div>

            <div className="post-repost">
              <p className="text-body">3</p>
              <RiShareBoxFill className="post-like-icon" />
            </div>
          </div>

          <div className="post-interaction">
            <button
              className={
                postIsLiked
                  ? "post-interaction-btn liked"
                  : "post-interaction-btn"
              }
              onClick={likePost}
            >
              {postIsLiked ? (
                <AiFillHeart className="post-interaction-icon" />
              ) : (
                <AiOutlineHeart className="post-interaction-icon" />
              )}

              {postIsLiked ? "Liked" : "Like"}
            </button>
            <button
              className="post-interaction-btn"
              onClick={activateCommentBox}
            >
              <FaRegComment className="post-interaction-icon" /> Comment
            </button>
            <button className="post-interaction-btn">
              <RiShareBoxFill className="post-interaction-icon" /> Share
            </button>
          </div>

          <div className="post-comments">
            <ul className="post-comments-list">
              {postComments
                .slice(0, visibleCommentsCount)
                .reverse()
                .map((comment) => {
                  return <Comment key={comment.id} comment={comment} />;
                })}
            </ul>

            {postCommentCount > 1 && (
              <div
                className="load-more-comments"
                onClick={() => {
                  setVisibleCommentsCount((prev) => prev + 2);
                }}
              >
                Load More Comments
              </div>
            )}
          </div>

          <div className="post-comment-box">
            <div className="user-image">
              <img src={user.avatar} alt="" />
            </div>
            <div className="comment-box">
              <form onSubmit={publishPostComment}>
                <input
                  type="text"
                  placeholder="Write your comment..."
                  ref={commentBoxRef}
                />
                <button type="submit" className="post-comment-send-btn">
                  <AiOutlineSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showImagePopup && (
        <ImagePopup image={imgFile} setShowImagePopup={setShowImagePopup} />
      )}
    </>
  );
}
