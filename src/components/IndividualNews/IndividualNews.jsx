import React, { useEffect, useState } from "react";

import "./IndividualNews.css";

// utils
import moment from "moment/moment";

// images
import newsImg from "../../images/newsImg.jpg";
import fbIcon from "../../images/icons/facebook.png";
import waIcon from "../../images/icons/whatsapp.png";
import twIcon from "../../images/icons/twitter.png";
import copyIcon from "../../images/icons/link.png";
import { toast } from "react-hot-toast";

export default function IndividualNews({ loginPage, article, filter }) {
  const [newsOpen, setNewsOpen] = useState(false);

  const toggleNewsOpen = () => {
    setNewsOpen(!newsOpen);
  };

  const copyArticleLink = (article) => {
    navigator?.clipboard
      .writeText(`${window.location.origin}/articles/${article.id}`)
      .then(() => {
        toast.success("Article link copied");
      })
      .catch(() => {
        toast.error("Unable to copy link");
      });
  };

  const base_url = window.location.origin;

  // share article link to facebook
  const shareArticleToFb = (article) => {
    const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${base_url}/articles/${article.id}`;
    window.open(fbLink, "_blank").focus();
  };

  // share article link to twitter
  const shareArticleToTw = (article) => {
    const twLink = `https://twitter.com/intent/tweet?hashtags=tulk&text=${article.title}&url=${base_url}/articles/${article.id}`;
    window.open(twLink, "_blank").focus();
  };

  // share article link to whatsapp
  const shareArticleToWa = (article) => {
    const twLink = `https://api.whatsapp.com/send?text=${base_url}/articles/${article.id}`;

    window.open(twLink, "_blank").focus();
  };

  const newsReelclass = newsOpen ? "newsreel active" : "newsreel";

  return (
    <>
      {(filter === "all" || article?.category === filter) && (
        <div className={newsReelclass}>
          <div className="newsreel-content" onClick={toggleNewsOpen}>
            <div className="newsreelImg">
              <img
                src={article.featured_image ? article.featured_image : newsImg}
                alt=""
              />
            </div>
            <div className="newsreelHead">
              <p className="small-text">
                {article.category?.toUpperCase()} |{" "}
                {moment(article.published_date).format("MMM Do YYYY")}
              </p>
              <div className="newsreelHead-header-text">
                <h3 className="h-100">
                  {newsOpen
                    ? article.title
                    : article.title.length < 25
                    ? article.title
                    : article.title.slice(0, 25) + "..."}
                </h3>
              </div>
              {loginPage && <p>{article.content}</p>}
            </div>
          </div>
          {newsOpen && (
            <>
              <div
                className="newsreel-body"
                dangerouslySetInnerHTML={{ __html: article.content }}
              ></div>

              <div className="newsreel-extra">
                <div className="newsreel-share">
                  <p className="text-body">Share Article</p>
                  <div className="newsreel-share-icons">
                    <div
                      className="newsreel-share-icon"
                      title="Copy Post Link"
                      onClick={() => copyArticleLink(article)}
                    >
                      <img src={copyIcon} alt="" />
                    </div>
                    <div
                      className="newsreel-share-icon"
                      title="Share article on facebook"
                      onClick={() => shareArticleToFb(article)}
                    >
                      <img src={fbIcon} alt="" />
                    </div>
                    <div
                      className="newsreel-share-icon"
                      title="Share article on twitter"
                      onClick={() => shareArticleToTw(article)}
                    >
                      <img src={twIcon} alt="" />
                    </div>
                    <div
                      className="newsreel-share-icon"
                      title="Share article on whatsapp"
                      onClick={() => shareArticleToWa(article)}
                    >
                      <img src={waIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
