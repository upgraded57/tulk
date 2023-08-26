import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../Axios/axiosInstance";
import toast from "react-hot-toast";

// styles
import "./createPostModal.css";

import { Userdata } from "../../data/Userdata";

// icons
import { IoIosClose } from "react-icons/io";
import { MdOutlinePermMedia } from "react-icons/md";

export default function CreatePostModal({ setCreatePostModal, group }) {
  // function to hide create post modal when hide button is clicked
  const hideCreatePostModal = () => {
    setCreatePostModal(false);
  };

  // auto-focus text area
  useEffect(() => {
    const createPostInputText = document.getElementById("createPostInputText");
    createPostInputText.focus();
  }, []);

  // current user
  const user = Userdata();

  // post refs
  const [postBody, setPostBody] = useState("");

  // file upload
  const handleMediaUpload = () => {
    const uploadFileInput = document.getElementById("createPostFileInput");

    // Temporarily show image to be uploaded
    for (const file of uploadFileInput.files) {
      // Temporarily show image to be uploaded
      const tempImg = document.createElement("img");
      tempImg.src = URL.createObjectURL(file);
      const tempImgContainer = document.createElement("div");
      tempImgContainer.classList.add("temp-image-upload");
      tempImgContainer.appendChild(tempImg);
      document
        .querySelector(".temp-image-container")
        .appendChild(tempImgContainer);
    }

    // delete temporarily uploaded image
    const tempImages = document.querySelectorAll(".temp-image-upload");
    tempImages.forEach((tempImage) => {
      tempImage.addEventListener("click", () => {
        document.querySelector(".temp-image-container").removeChild(tempImage);
      });
    });
  };

  // const authAxios = axiosInstance();
  const uploadPost = async () => {
    const toastId = toast.loading("Creating Post...");

    // append image to form data to be sent to server
    const uploadFileInput = document.getElementById("createPostFileInput");
    const postFormData = new FormData();
    postFormData.append("author", user.user_id);
    postFormData.append("content", postBody);
    group && postFormData.append("group", group.id);
    Array.from(uploadFileInput.files).forEach((file) => {
      return postFormData.append("files", file);
    });

    if (postBody.trim() === "") {
      toast.error("cannot create empty post!", {
        id: toastId,
      });
      return;
    } else {
      await axiosInstance({
        method: "post",
        url: group
          ? `https://tulk-social-f7f4f4c56190.herokuapp.com/group/${group.id}/posts/`
          : "https://tulk-social-f7f4f4c56190.herokuapp.com/posts/",
        data: postFormData,
      })
        .then((res) => {
          toast.success("Post created successfully!", {
            id: toastId,
          });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to create post!", {
            id: toastId,
          });
        });
    }
  };

  return (
    <div className="create-post-modal">
      <div className="create-post-modal-container">
        <div className="create-post-modal-container-header mt-sm">
          <h3 className="h-100">Create Post</h3>
          <div className="close-post-modal-btn" onClick={hideCreatePostModal}>
            <IoIosClose />
          </div>
        </div>

        <div className="create-post-modal-container-user-image-add-file mt-xsm">
          <div className="create-post-modal-container-user-image">
            <img src={user.avatar} alt="" />
          </div>
          <div className="create-post-modal-container-add-file">
            <label htmlFor="createPostFileInput">
              <p className="text-body">Add File</p>
              <MdOutlinePermMedia />
            </label>
            <input
              type="file"
              id="createPostFileInput"
              multiple="multiple"
              hidden
              onChange={handleMediaUpload}
            />
          </div>
        </div>

        <div className="create-post-modal-container-textarea mt-xsm">
          <textarea
            autofocus="true"
            id="createPostInputText"
            placeholder="Create Post..."
            onChange={(e) => setPostBody(e.target.value)}
          ></textarea>
        </div>

        <div className="temp-image-container"></div>

        <div className="create-post-modal-container-cta mt-xsm">
          <button className="btn-solid" onClick={() => uploadPost()}>
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}
