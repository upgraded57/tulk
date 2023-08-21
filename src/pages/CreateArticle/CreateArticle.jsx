import React, { useState } from "react";
import "./createArticle.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

// images
import tempImg from "../../images/Frame 72.png";

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
    const tempFeaturedImg = URL.createObjectURL(e.target?.files[0]);
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
    articleFormData.append("content", articleContent);
    {
      articleFeaturedImage &&
        articleFormData.append("featured_image", articleFeaturedImage);
    }

    const toastId = toast.loading("Publishing post");
    await axiosInstance({
      method: "post",
      url: "/editor/publish-article",
      data: articleFormData,
    })
      .then((res) => {
        console.log(res);
        toast.success("Post published", {
          id: toastId,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to publish post", {
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
            <Link to="#">Save Draft</Link>
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
                  value="politics"
                  id="politics"
                  name="articleCategory"
                  onChange={(e) => setArticleCategory(e.target.value)}
                />
                <label htmlFor="politics">Politics</label>
              </div>

              <div className="category">
                <input
                  type="radio"
                  value="entertainment"
                  id="entertainment"
                  name="articleCategory"
                  onChange={(e) => setArticleCategory(e.target.value)}
                />
                <label htmlFor="entertainment">Entertainment</label>
              </div>

              <div className="category">
                <input
                  type="radio"
                  value="sport"
                  id="sport"
                  name="articleCategory"
                  onChange={(e) => setArticleCategory(e.target.value)}
                />
                <label htmlFor="sport">Sport</label>
              </div>

              <div className="category">
                <input
                  type="radio"
                  value="metro"
                  id="metro"
                  name="articleCategory"
                  onChange={(e) => setArticleCategory(e.target.value)}
                />
                <label htmlFor="metro">Metro</label>
              </div>

              <div className="category">
                <input
                  type="radio"
                  value="more"
                  id="more"
                  name="articleCategory"
                  onChange={(e) => setArticleCategory(e.target.value)}
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
