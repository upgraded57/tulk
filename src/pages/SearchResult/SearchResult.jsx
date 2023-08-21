import React from "react";

// styles
import "./searchResult.css";

// components
import Post from "../../components/Post/Post";

import { posts } from "../../data/data";

// images
import searchImage from "../../images/Frame 80.png";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function SearchResult() {
  // get search query
  const { search_query } = useParams();
  console.log(search_query);
  // function to filter search result (variables)
  const [showPeople, setShowPeople] = useState(true);
  const [showGroups, setShowGroups] = useState(true);
  const [showPosts, setShowPosts] = useState(true);

  // function to filter search result to show all
  const showAllFilter = () => {
    setShowPeople(true);
    setShowGroups(true);
    setShowPosts(true);
  };

  // function to filter search result to show only people
  const showPeopleFilter = () => {
    if (!showPeople) {
      setShowPeople(true);
    }
    setShowGroups(false);
    setShowPosts(false);
  };

  // function to filter search result to show only groups
  const showGroupsFilter = () => {
    if (!showGroups) {
      setShowGroups(true);
    }
    setShowPeople(false);
    setShowPosts(false);
  };

  // function to filter search result to show only posts
  const showPostsFilter = () => {
    if (!showPosts) {
      setShowPosts(true);
    }
    setShowGroups(false);
    setShowPeople(false);
  };
  return (
    <>
      <Navbar />
      <div className="search-result">
        <div className="search-result-filter">
          <div className="search-result-filter-header">
            <h2 className="h-200">Search Result</h2>
          </div>
          <div className="search-result-filter-list">
            <ul>
              <li onClick={showAllFilter}>All</li>
              <li onClick={showPeopleFilter}>People</li>
              <li onClick={showGroupsFilter}>Groups</li>
              <li onClick={showPostsFilter}>Posts</li>
            </ul>
          </div>
        </div>

        <div className="search-result-main">
          {/* People Container */}
          {showPeople && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">People</h3>
              </div>

              <div className="search-result-main-container-body">
                <div className="search-result-main-container-body-list">
                  <div className="search-result-main-container-body-list-image">
                    <img src={searchImage} alt="" />
                  </div>

                  <div className="search-result-main-container-body-list-content">
                    <p className="text-body">Group Name</p>
                    <p className="small-text">Location: Nigeria</p>
                  </div>

                  <div className="search-result-main-container-body-list-cta">
                    <button className="btn-secondary">Connect</button>
                  </div>
                </div>

                <div className="search-result-main-container-body-list">
                  <div className="search-result-main-container-body-list-image">
                    <img src={searchImage} alt="" />
                  </div>

                  <div className="search-result-main-container-body-list-content">
                    <p className="text-body">Someone Name</p>
                    <p className="small-text">Location: Nigeria</p>
                  </div>

                  <div className="search-result-main-container-body-list-cta">
                    <button className="btn-secondary">Connect</button>
                  </div>
                </div>

                <div className="search-result-main-container-body-list">
                  <div className="search-result-main-container-body-list-image">
                    <img src={searchImage} alt="" />
                  </div>

                  <div className="search-result-main-container-body-list-content">
                    <p className="text-body">Someone Name</p>
                    <p className="small-text">Location: Nigeria</p>
                  </div>

                  <div className="search-result-main-container-body-list-cta">
                    <button className="btn-secondary">Connect</button>
                  </div>
                </div>

                <div className="search-result-main-container-body-list">
                  <div className="search-result-main-container-body-list-image">
                    <img src={searchImage} alt="" />
                  </div>

                  <div className="search-result-main-container-body-list-content">
                    <p className="text-body">Someone Name</p>
                    <p className="small-text">Location: Nigeria</p>
                  </div>

                  <div className="search-result-main-container-body-list-cta">
                    <button className="btn-secondary">Connect</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Groups Container */}
          {showGroups && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Groups</h3>
              </div>

              <div className="search-result-main-container-body">
                <div className="search-result-main-container-body-list">
                  <div className="search-result-main-container-body-list-image">
                    <img src={searchImage} alt="" />
                  </div>

                  <div className="search-result-main-container-body-list-content">
                    <p className="text-body">Group Name (Member)</p>
                    <p className="small-text">Location: Nigeria</p>
                  </div>
                </div>

                <div className="search-result-main-container-body-list">
                  <div className="search-result-main-container-body-list-image">
                    <img src={searchImage} alt="" />
                  </div>

                  <div className="search-result-main-container-body-list-content">
                    <p className="text-body">Group Name (Member)</p>
                    <p className="small-text">Location: Nigeria</p>
                  </div>
                </div>

                <div className="search-result-main-container-body-list">
                  <div className="search-result-main-container-body-list-image">
                    <img src={searchImage} alt="" />
                  </div>

                  <div className="search-result-main-container-body-list-content">
                    <p className="text-body">Group Name</p>
                    <p className="small-text">Location: Nigeria</p>
                  </div>

                  <div className="search-result-main-container-body-list-cta">
                    <button className="btn-secondary">Connect</button>
                  </div>
                </div>

                <div className="search-result-main-container-body-list">
                  <div className="search-result-main-container-body-list-image">
                    <img src={searchImage} alt="" />
                  </div>

                  <div className="search-result-main-container-body-list-content">
                    <p className="text-body">Group Name</p>
                    <p className="small-text">Location: Nigeria</p>
                  </div>

                  <div className="search-result-main-container-body-list-cta">
                    <button className="btn-secondary">Connect</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Posts Container */}
          {showPosts && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Posts</h3>
              </div>

              <div className="search-result-main-container-body">
                <Post post={posts} />
                <Post post={posts} />
                <Post post={posts} />
                <Post post={posts} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
