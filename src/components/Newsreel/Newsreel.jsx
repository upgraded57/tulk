import React from "react";

// styles
import "./newsreel.css";

// images
import noArticle from "../../images/icons/no-article.svg";

// components
import IndividualNews from "../IndividualNews/IndividualNews";

// utils
import { useState, useEffect } from "react";
import axios from "axios";

// icons
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { BsSearch } from "react-icons/bs";

// data
import { fetchArticles } from "../../Axios/ApiCalls";

export default function Newsreel({
  filter,
  setFilter,
  loginPage,
  feedsSwitched,
}) {
  const [newsCount, setNewsCount] = useState(10);

  // set variable to hold news articles
  const [Articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles(setArticles);
  }, []);

  // function to show search news input field when search icon is clicked
  const showSearchInput = () => {
    document.getElementById("search-input").classList.toggle("active");
  };

  // function to listen to small screen size
  const [smallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    const windowResizeListener = (window.onresize = () => {
      if (window.innerWidth <= 920) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
      }
    });

    return windowResizeListener();
  }, []);

  return (
    <div className="newsreelDiv">
      {/* FeedsSwitched is used to control the visibility of the news navigation only on large screen */}
      {!loginPage && !feedsSwitched && !smallScreen && (
        <div className="news-nav">
          <ul>
            <li
              className="active"
              value="all"
              onClick={(e) => setFilter(e.target.value)}
            >
              All News
            </li>
            <li value="sport" onClick={(e) => setFilter(e.target.value)}>
              Sport
            </li>
            <li value="politics" onClick={(e) => setFilter(e.target.value)}>
              Politics
            </li>
            <li value="metro" onClick={(e) => setFilter(e.target.value)}>
              Metro
            </li>
            <li
              value="entertainment"
              onClick={(e) => setFilter(e.target.value)}
            >
              Entertainment &amp; More
            </li>
          </ul>
        </div>
      )}

      {feedsSwitched && (
        <div className="newspage-navbar-alt">
          <div className="news-filter">
            <TfiLayoutGrid3Alt />
            <select name="news-filter" id="news-filter">
              <option
                value="All-news"
                onChange={(e) => setFilter(e.target.value)}
              >
                All Updates
              </option>
              <option
                value="All-news"
                onChange={(e) => setFilter(e.target.value)}
              >
                Sports
              </option>
              <option
                value="All-news"
                onChange={(e) => setFilter(e.target.value)}
              >
                Politics
              </option>
              <option
                value="All-news"
                onChange={(e) => setFilter(e.target.value)}
              >
                Metro
              </option>
              <option
                value="All-news"
                onChange={(e) => setFilter(e.target.value)}
              >
                Entertainment & More
              </option>
            </select>
          </div>
          <div className="news-search">
            <input type="text" id="search-input" placeholder="Search news..." />
            <BsSearch className="news-search-icon" onClick={showSearchInput} />
          </div>
        </div>
      )}
      {Articles?.length === 0 ? (
        <div className="noArticle">
          <img src={noArticle} alt="" />
          <p className="text-body">
            No articles found. <br /> Check back later
          </p>
        </div>
      ) : (
        Articles?.map((article) => {
          return (
            <IndividualNews
              key={article.id}
              article={article}
              filter={filter}
            />
          );
        })
      )}

      {Articles?.length > 10 && (
        <button
          className="btn-solid"
          onClick={() => setNewsCount((prev) => prev + 10)}
        >
          View More
        </button>
      )}
    </div>
  );
}
