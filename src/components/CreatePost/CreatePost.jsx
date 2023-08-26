// utils
import React, { useState } from "react";

// styles
import "./createPost.css";

// icons
import { VscSmiley } from "react-icons/vsc";
import { MdPermMedia } from "react-icons/md";

import { Userdata } from "../../data/Userdata";

// components
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import { useSelector } from "react-redux";

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
        {user.avatar && (
          <div className="create-post-user-img">
            <img src={user.avatar} alt="" />
          </div>
        )}
        <div className="create-post-textarea" onClick={showCreatePostModal}>
          <textarea
            rows="2"
            placeholder="Create Post..."
            disabled={true}
          ></textarea>
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
