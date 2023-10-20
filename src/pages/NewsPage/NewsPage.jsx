import React, { useState } from "react";

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

  const [filter, setFilter] = useState("all");
  return (
    <>
      <Navbar />
      <div className="newspage">
        <div className="newspage-navbar">
          <div className="news-filter">
            <TfiLayoutGrid3Alt />
            <select name="news-filter" id="news-filter">
              <option value="all" onChange={(e) => setFilter(e.target.value)}>
                All Updates
              </option>
              <option
                value="entertainment"
                onChange={(e) => setFilter(e.target.value)}
              >
                Entertainment & More
              </option>
              <option value="metro" onChange={(e) => setFilter(e.target.value)}>
                Metro
              </option>
              <option
                value="politics"
                onChange={(e) => setFilter(e.target.value)}
              >
                Politics
              </option>
              <option value="sport" onChange={(e) => setFilter(e.target.value)}>
                Sports
              </option>
            </select>
          </div>
          <div className="news-search">
            <input type="text" id="search-input" placeholder="Search news..." />
            <BsSearch className="news-search-icon" onClick={showSearchInput} />
          </div>
        </div>

        <div className="newspage-body">
          <Newsreel filter={filter} />
        </div>
      </div>
    </>
  );
}
