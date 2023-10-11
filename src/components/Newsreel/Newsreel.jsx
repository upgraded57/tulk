import React from "react";

// styles
import "./newsreel.css";

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
import UseFetchArticles from "./../../Hooks/Articles/UseFetchArticles";

export default function Newsreel({ loginPage, feedsSwitched }) {
  const [newsCount, setNewsCount] = useState(10);

  // set variable to hold news articles
  // const [Articles, setArticles] = useState([]);

  // useEffect(() => {
  //   fetchArticles(setArticles);
  // }, []);

  const { data: Articles } = UseFetchArticles();

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
            <li className="active">All News</li>
            <li>Sport</li>
            <li>Politics</li>
            <li>Metro</li>
            <li>Entertainment &amp; More</li>
          </ul>
        </div>
      )}

      {feedsSwitched && (
        <div className="newspage-navbar-alt">
          <div className="news-filter">
            <TfiLayoutGrid3Alt />
            <select name="news-filter" id="news-filter">
              <option value="All-news">All Updates</option>
              <option value="All-news">Sports</option>
              <option value="All-news">Politics</option>
              <option value="All-news">Metro</option>
              <option value="All-news">Entertainment & More</option>
            </select>
          </div>
          <div className="news-search">
            <input type="text" id="search-input" placeholder="Search news..." />
            <BsSearch className="news-search-icon" onClick={showSearchInput} />
          </div>
        </div>
      )}
      {Articles?.map((article) => {
        return <IndividualNews key={article.id} article={article} />;
      })}

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
