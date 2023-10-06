import React, { useState } from "react";
import "./createArticle.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

// quill text editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Userdata } from "../../data/Userdata";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../Axios/axiosInstance";

// icons
import { AiOutlineUnorderedList, AiOutlineClose } from "react-icons/ai";

export default function CreateArticle() {
  const user = Userdata();
  const navigate = useNavigate();
  const [optionMenuActive, setOptionMenuActive] = useState(false);
  const toggleOptionMenu = () => {
    setOptionMenuActive(!optionMenuActive);
  };

  // select article object
  const [articleContent, setArticleContent] = useState("");
  const [articleCategory, setArticleCategory] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleFeaturedImage, setArticleFeaturedImage] = useState(null);

  // choose featured image
  const selectFeaturedImage = (e) => {
    const tempFeaturedImg = URL.createObjectURL(e?.target.files[0]);
    const featuredImgContainer = document.getElementById(
      "featuredImgContainer"
    );
    featuredImgContainer.src = tempFeaturedImg;
    setArticleFeaturedImage(e.target.files[0]);
  };

  // publish article
  const publishArticle = async () => {
    if (
      articleCategory.length === 0 ||
      articleContent.length === 0 ||
      articleTitle.length === 0
    ) {
      toast.error("You haven't filled the required field");
      return;
    }

    // prepare article data
    const articleFormData = new FormData();
    articleFormData.append("author", user.user_id);
    articleFormData.append("title", articleTitle);
    articleFormData.append("category", articleCategory);
    articleFormData.append("content", articleContent);
    {
      articleFeaturedImage &&
        articleFormData.append("featured_image", articleFeaturedImage);
    }

    const toastId = toast.loading("Publishing post");
    await axiosInstance({
      method: "post",
      url: "/editor/publish-article/",
      data: articleFormData,
    })
      .then(() => {
        toast.success("Article published", {
          id: toastId,
        });
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to publish article", {
          id: toastId,
        });
      });
  };

  const saveArticleAsDraft = async () => {
    if (
      articleCategory.length === 0 ||
      articleContent.length === 0 ||
      articleTitle.length === 0
    ) {
      toast.error("You haven't filled the required field");
      return;
    }

    // prepare article data
    const articleFormData = new FormData();
    articleFormData.append("author", user.user_id);
    articleFormData.append("status", "draft");
    articleFormData.append("title", articleTitle);
    articleFormData.append("category", articleCategory);
    articleFormData.append("content", articleContent);
    {
      articleFeaturedImage &&
        articleFormData.append("featured_image", articleFeaturedImage);
    }

    const toastId = toast.loading("Saving article");
    await axiosInstance({
      method: "post",
      url: "/editor/publish-article/",
      data: articleFormData,
    })
      .then(() => {
        toast.success("Article saved as draft", {
          id: toastId,
        });
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to save article", {
          id: toastId,
        });
      });
  };
  return (
    <>
      <Navbar />
      <div className="create-article">
        <div className="create-article-left">
          <input
            type="text"
            placeholder="Add title"
            onChange={(e) => setArticleTitle(e.target.value)}
          />
          <ReactQuill
            theme="snow"
            value={articleContent}
            onChange={setArticleContent}
          />
        </div>
        <div className="burger" onClick={toggleOptionMenu}>
          {optionMenuActive ? <AiOutlineClose /> : <AiOutlineUnorderedList />}
        </div>
        <div className="create-article-right">
          <div className="publish-options">
            <span className="save-draft" onClick={saveArticleAsDraft}>
              Save Draft
            </span>
            <button className="btn-solid" onClick={publishArticle}>
              Publish
            </button>
          </div>
          <div
            className={
              optionMenuActive
                ? "create-article-options active"
                : "create-article-options"
            }
          >
            <div className="article-categories">
              <h3 className="h-100">Categories</h3>
              <div className="category">
                <input
                  type="radio"
                  id="politics"
                  name="articleCategory"
                  onClick={() => setArticleCategory("politics")}
                />
                <label htmlFor="politics">Politics</label>
              </div>

              <div className="category">
                <input
                  type="radio"
                  id="entertainment"
                  name="articleCategory"
                  onClick={() => setArticleCategory("entertainment")}
                />
                <label htmlFor="entertainment">Entertainment</label>
              </div>

              <div className="category">
                <input
                  type="radio"
                  id="sport"
                  name="articleCategory"
                  onClick={() => setArticleCategory("sport")}
                />
                <label htmlFor="sport">Sport</label>
              </div>

              <div className="category">
                <input
                  type="radio"
                  id="metro"
                  name="articleCategory"
                  onClick={() => setArticleCategory("metro")}
                />
                <label htmlFor="metro">Metro</label>
              </div>

              <div className="category">
                <input
                  type="radio"
                  id="more"
                  name="articleCategory"
                  onClick={(e) => setArticleCategory("more")}
                />
                <label htmlFor="more">More</label>
              </div>
            </div>

            <div className="featured-image">
              <h3 className="h-100">Featured Image</h3>
              <div className="featured-image-img-container">
                <img src="" alt="" id="featuredImgContainer" />
              </div>
              <div className="featured-image-input">
                <input
                  type="file"
                  id="featuredImgInput"
                  max="1"
                  accept="image/png, image/gif, image/jpeg"
                  hidden
                  onChange={(e) => selectFeaturedImage(e)}
                />
                <label htmlFor="featuredImgInput" className="btn-secondary">
                  Add Featured Image
                </label>
              </div>
            </div>

            <div className="gallery">Add Gallery +</div>
          </div>
        </div>
      </div>
    </>
  );
}
