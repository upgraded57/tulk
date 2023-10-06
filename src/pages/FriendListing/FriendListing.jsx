import React, { useState } from "react";
import { Link } from "react-router-dom";

// styles
import "../SearchResult/searchResult.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";

// components
import Navbar from "../../components/Navbar/Navbar";
import Loader from "./../../components/Loader/Loader";

// hooks
import useFetchUsers from "./../../Hooks/Users/useFetchUsers";
import UseFetchFriendRequests from "./../../Hooks/User/UseFetchFriendRequests";
import UseFetchUserFriends from "../../Hooks/User/UseFetchUserFriends";

// api calls
import {
  acceptFriendRequest,
  deleteFriendRequest,
  sendFriendRequest,
} from "../../Axios/ApiCalls";

// data
import { Userdata } from "../../data/Userdata";

export default function SearchResult() {
  const currentUser = Userdata();

  // function to filter search result (variables)
  const [showFriends, setShowFriends] = useState(true);
  const [showPeople, setShowPeople] = useState(true);
  const [showGroups, setShowGroups] = useState(true);

  // function to filter search result to show all
  const showAllFilter = () => {
    setShowFriends(true);
    setShowPeople(true);
    setShowFriends(true);
  };

  // function to filter search result to show only user friends
  const showFriendsFilter = () => {
    if (!showFriends) {
      setShowFriends(true);
    }
    setShowPeople(false);
    setShowGroups(false);
  };

  // function to filter search result to show only people
  const showPeopleFilter = () => {
    if (!showPeople) {
      setShowPeople(true);
    }
    setShowFriends(false);
    setShowGroups(false);
  };

  // function to filter search result to show only groups
  const showGroupsFilter = () => {
    if (!showGroups) {
      setShowGroups(true);
    }
    setShowFriends(false);
    setShowPeople(false);
  };

  const { isLoading: friendsLoading, data: friends } = UseFetchUserFriends(
    currentUser.user_id
  );

  const { isLoading: usersLoading, data: users } = useFetchUsers("1");

  const { isLoading: friendRequestsLoading, data: friendRequests } =
    UseFetchFriendRequests("1");

  const friendsId = [];
  friends.forEach((friend) => {
    friendsId.push(friend.id);
  });

  return (
    <>
      <Navbar />
      <div className="search-result">
        <div className="group-listing-filter">
          <div className="group-listing-filter-header">
            <h2 className="h-200">Groups</h2>
          </div>

          <div className="group-listing-filter-list">
            <ul>
              <li onClick={showAllFilter}>All People</li>
              <li onClick={showFriendsFilter}>Your Friends</li>
              <li onClick={showPeopleFilter}>Friend Request</li>
              <li onClick={showGroupsFilter}>Friend suggestions</li>
            </ul>
          </div>
        </div>

        <div className="search-result-main">
          {/* Friends Container */}
          {showFriends && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Your Friends </h3>
              </div>

              {friends.length < 1 ? (
                <p>You have no friends yet!</p>
              ) : (
                <>
                  <div className="search-result-main-container-body">
                    {friendsLoading ? (
                      <Loader type="list" />
                    ) : (
                      <>
                        {friends.map((friend) => {
                          return (
                            <div
                              className="search-result-main-container-body-list"
                              key={friend.id}
                            >
                              <Link to={`/profile/${friend.id}/`}>
                                <div className="search-result-main-container-body-list-image">
                                  <img
                                    src={
                                      friend.avatar ? friend.avatar : noAvatar
                                    }
                                    alt=""
                                  />
                                </div>

                                <div className="search-result-main-container-body-list-content">
                                  <p className="text-body">{`${friend.first_name} ${friend.last_name}`}</p>
                                  <p className="small-text">
                                    {friend.bio
                                      ? friend.bio?.length < 80
                                        ? friend.bio
                                        : friend.bio?.slice(0, 80) + "..."
                                      : ""}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </>
                    )}

                    <div className="load-more-link">
                      <Link to="#">Load More</Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Friend Requests container */}
          {showPeople && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Friend Requests </h3>
              </div>
              {friendRequests.length < 1 ? (
                <p>You have no pending friend requests!</p>
              ) : (
                <>
                  <div className="search-result-main-container-body">
                    {friendRequestsLoading ? (
                      <Loader type="list" />
                    ) : (
                      <>
                        {friendRequests.map((request) => {
                          return (
                            <div
                              className="search-result-main-container-body-list"
                              key={request.id}
                            >
                              <Link to={`/profile/${request.sender_id}`}>
                                <div className="search-result-main-container-body-list-image">
                                  <img
                                    src={
                                      request.sender_avatar
                                        ? request.sender_avatar
                                        : noAvatar
                                    }
                                    alt=""
                                  />
                                </div>

                                <div className="search-result-main-container-body-list-content">
                                  <p className="text-body">
                                    {request.sender_name}
                                  </p>
                                  <p className="small-text">{request.desc}</p>
                                </div>
                              </Link>

                              <div className="search-result-main-container-body-list-cta">
                                <button
                                  className="btn-secondary"
                                  onClick={() => acceptFriendRequest(request)}
                                >
                                  Accept
                                </button>
                                <button
                                  className="btn-secondary"
                                  onClick={() => deleteFriendRequest(request)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                    <div className="load-more-link">
                      <Link to="#">Load More</Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Friends suggestion Container */}
          {showGroups && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Friend Suggestions </h3>
              </div>

              <div className="search-result-main-container-body">
                {usersLoading ? (
                  <Loader type="list" />
                ) : (
                  <>
                    {users.map((user) => {
                      return (
                        <div
                          className="search-result-main-container-body-list"
                          key={user.id}
                        >
                          <Link to={`/profile/${user.id}/`}>
                            <div className="search-result-main-container-body-list-image">
                              <img
                                src={user.avatar ? user.avatar : noAvatar}
                                alt=""
                              />
                            </div>

                            <div className="search-result-main-container-body-list-content">
                              <p className="text-body">{`${user.first_name} ${user.last_name}`}</p>
                              <p className="small-text">
                                {user.bio
                                  ? user.bio?.length < 80
                                    ? user.bio
                                    : user.bio?.slice(0, 80) + "..."
                                  : ""}
                              </p>
                            </div>
                          </Link>
                          <div className="search-result-main-container-body-list-cta">
                            {user.id !== currentUser.user_id &&
                              !friendsId.includes(user.id) && (
                                <button
                                  className="btn-secondary"
                                  onClick={() =>
                                    sendFriendRequest(currentUser.user_id, user)
                                  }
                                >
                                  Add Friend
                                </button>
                              )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
                <div className="load-more-link">
                  <Link to="#">Load More</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
