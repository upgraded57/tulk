import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

// styles
import "./searchResult.css";

// components
import Post from "../../components/Post/Post";
import Navbar from "../../components/Navbar/Navbar";
import IndividualNews from "../../components/IndividualNews/IndividualNews";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import noGroupAvatar from "../../images/noGroupAvatar.jpg";

// utils
import { axiosInstance } from "../../Axios/axiosInstance";
import { Userdata } from "../../data/Userdata";

// API calls
import { sendFriendRequest } from "../../Axios/ApiCalls";

// hooks
import UseFetchUserFriends from "./../../Hooks/User/UseFetchUserFriends";
import useSearchGroups from "../../Hooks/Search/useSearchGroups";
import UseSearchPosts from "../../Hooks/Search/UseSearchPosts";
import UseSearchArticles from "../../Hooks/Search/UseSearchArticles";
import useFetchUsers from "./../../Hooks/Users/useFetchUsers";

export default function SearchResult() {
  // get search query
  const { search_query } = useParams();

  // get current user
  const user = Userdata();

  // search for people
  const { isLoading: searchUsersLoading, data: searchedPeople } =
    useFetchUsers("1");

  // search for groups
  const { isLoading: searchGroupLoading, data: searchedGroups } =
    useSearchGroups(search_query);

  // search for posts
  const { isLoading: searchPostsLoading, data: searchedPosts } =
    UseSearchPosts(search_query);

  // search for articles
  const { isLoading: searchArticlesLoading, data: searchedArticles } =
    UseSearchArticles(search_query);

  // fetch user friends to determine when to show Add Friend button in people result
  const { isLoading: userFriendsLoading, data: friends } = UseFetchUserFriends(
    user.user_id
  );

  const friendsId = [];
  friends.forEach((friend) => {
    friendsId.push(friend.id);
  });

  // function to filter search result (variables)
  const [showPeople, setShowPeople] = useState(true);
  const [showGroups, setShowGroups] = useState(true);
  const [showPosts, setShowPosts] = useState(true);
  const [showArticles, setShowArticles] = useState(true);

  // function to filter search result to show all
  const showAllFilter = () => {
    setShowPeople(true);
    setShowGroups(true);
    setShowPosts(true);
    setShowArticles(true);
  };

  // function to filter search result to show only people
  const showPeopleFilter = () => {
    if (!showPeople) {
      setShowPeople(true);
    }
    setShowGroups(false);
    setShowPosts(false);
    setShowArticles(false);
  };

  // function to filter search result to show only groups
  const showGroupsFilter = () => {
    if (!showGroups) {
      setShowGroups(true);
    }
    setShowPeople(false);
    setShowPosts(false);
    setShowArticles(false);
  };

  // function to filter search result to show only posts
  const showPostsFilter = () => {
    if (!showPosts) {
      setShowPosts(true);
    }
    setShowGroups(false);
    setShowPeople(false);
    setShowArticles(false);
  };

  // function to filter search result to show only articles
  const showArticlesFilter = () => {
    if (!showArticles) {
      setShowArticles(true);
    }
    setShowGroups(false);
    setShowPosts(false);
    setShowPeople(false);
  };

  return (
    <>
      <Navbar />
      <div className="search-result">
        <div className="search-result-filter">
          <div className="search-result-filter-header">
            <h2 className="h-200">{search_query}</h2>
          </div>
          <div className="search-result-filter-list">
            <ul>
              <li onClick={showAllFilter}>All</li>
              <li onClick={showPeopleFilter}>People</li>
              <li onClick={showGroupsFilter}>Groups</li>
              <li onClick={showPostsFilter}>Posts</li>
              <li onClick={showArticlesFilter}>Articles</li>
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

              {searchedPeople.length === 0 ? (
                <p>Your search didn't return any person</p>
              ) : (
                <>
                  <div className="search-result-main-container-body">
                    {searchedPeople.map((person) => {
                      return (
                        <div
                          className="search-result-main-container-body-list"
                          key={person.id}
                        >
                          <Link to={`/profile/${person.id}`}>
                            <div className="search-result-main-container-body-list-image">
                              <img
                                src={person.avatar ? person.avatar : noAvatar}
                                alt=""
                              />
                            </div>

                            <div className="search-result-main-container-body-list-content">
                              <p className="text-body">{`${person.first_name} ${person.last_name}`}</p>
                              {person.location && (
                                <p className="small-text">
                                  Location: {person.location}
                                </p>
                              )}
                            </div>
                          </Link>

                          {user.user_id !== person.id &&
                            !friendsId.includes(person.id) && (
                              <div className="search-result-main-container-body-list-cta">
                                <button
                                  className="btn-secondary"
                                  onClick={() =>
                                    sendFriendRequest(
                                      axiosInstance,
                                      user.user_id,
                                      person
                                    )
                                  }
                                >
                                  Add Friend
                                </button>
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Groups Container */}
          {showGroups && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Groups</h3>
              </div>

              {searchedGroups.length === 0 ? (
                <p>Your search didn't return any group</p>
              ) : (
                <>
                  <div className="search-result-main-container-body">
                    {searchedGroups.map((group) => {
                      return (
                        <div
                          className="search-result-main-container-body-list"
                          key={group.id}
                        >
                          <Link to={`/groups/${group.id}/`}>
                            <div className="search-result-main-container-body-list-image">
                              <img
                                src={
                                  group.avatar ? group.avatar : noGroupAvatar
                                }
                                alt=""
                              />
                            </div>

                            <div className="search-result-main-container-body-list-content">
                              <p className="text-body">{group.name}</p>
                              {group.location && (
                                <p className="small-text">Location: Nigeria</p>
                              )}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Posts Container */}
          {showPosts && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Posts</h3>
              </div>

              {searchedPosts.length === 0 ? (
                <p>Your search didn't return any post</p>
              ) : (
                searchedPosts.map((post) => {
                  return <Post post={post} key={post.id} />;
                })
              )}
            </div>
          )}

          {/* Posts Container */}
          {showArticles && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Articles</h3>
              </div>

              {searchedArticles.length === 0 ? (
                <p>Your search didn't return any article</p>
              ) : (
                searchedArticles.map((article) => {
                  return <IndividualNews article={article} key={article.id} />;
                })
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
