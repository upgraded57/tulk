import React from "react";

// styles
import "./newsPage.css";

// components
import Newsreel from "../../components/Newsreel/Newsreel";
import Navbar from "../../components/Navbar/Navbar";
// icons
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { BsSearch } from "react-icons/bs";

export default function NewsPage() {
  // function to show search news input field when search icon is clicked
  const showSearchInput = () => {
    document.getElementById("search-input").classList.toggle("active");
  };
  return (
    <>
      <Navbar />
      <div className="newspage">
        <div className="newspage-navbar">
          <div className="news-filter">
            <TfiLayoutGrid3Alt />
            <select name="news-filter" id="news-filter">
              <option value="All-news">All Updates</option>
              <option value="All-news">Entertainment & More</option>
              <option value="All-news">Metro</option>
              <option value="All-news">Politics</option>
              <option value="All-news">Sports</option>
            </select>
          </div>
          <div className="news-search">
            <input type="text" id="search-input" placeholder="Search news..." />
            <BsSearch className="news-search-icon" onClick={showSearchInput} />
          </div>
        </div>

        <div className="newspage-body">
          <Newsreel />
        </div>
      </div>
    </>
  );
}
