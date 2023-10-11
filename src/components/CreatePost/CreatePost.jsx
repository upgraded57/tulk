// utils
import React, { useState } from "react";

// images
import noAvatar from "../../images/noAvatar.jpeg";

// styles
import "./createPost.css";

// icons
import { VscSmiley } from "react-icons/vsc";
import { MdPermMedia } from "react-icons/md";

import { Userdata } from "../../data/Userdata";

// components
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import { Link } from "react-router-dom";

export default function CreatePost({ group }) {
  // variable to toggle create post modal on and off
  const [createPostModal, setCreatePostModal] = useState(false);

  // function to show create post modal
  const showCreatePostModal = () => {
    setCreatePostModal(true);
  };

  // current user
  const user = Userdata();

  return (
    <div className="createPostDiv">
      <div className="createPost">
        <div className="create-post-user-img">
          <Link to={`/profile/${user.user_id}/`}>
            <img src={user.avatar ? user.avatar : noAvatar} alt="" />
          </Link>
        </div>
        <div className="create-post-textarea" onClick={showCreatePostModal}>
          <textarea rows="2" placeholder="Create Post..."></textarea>
          <VscSmiley className="createPostIcon" />
        </div>
      </div>

      <div className="create-post-insert-media" onClick={showCreatePostModal}>
        <MdPermMedia className="create-post-insert-media-icon" />
        <p className="text-body">Upload Photo / Video</p>
      </div>

      {createPostModal && (
        <CreatePostModal
          setCreatePostModal={setCreatePostModal}
          group={group}
        />
      )}
    </div>
  );
}
