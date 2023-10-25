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
import { axiosInstance } from "../../Axios/axiosInstance";
import { useQueryClient } from "react-query";

export default function SearchResult() {
  const currentUser = Userdata();

  const queryClient = useQueryClient();

  // function to filter search result (variables)
  const [filter, setFilter] = useState("all");

  const { isLoading: friendsLoading, data: friends } = UseFetchUserFriends(
    currentUser.user_id
  );

  const { isLoading: usersLoading, data: users } = useFetchUsers();

  const { isLoading: friendRequestsLoading, data: friendRequests } =
    UseFetchFriendRequests();

  const friendsId = [];
  friends?.forEach((friend) => {
    friendsId.push(friend.id);
  });

  return (
    <>
      <Navbar />
      <div className="search-result">
        <div className="group-listing-filter">
          <div className="group-listing-filter-header">
            <h2 className="h-200">People</h2>
          </div>

          <div className="group-listing-filter-list">
            <ul>
              <li onClick={() => setFilter("all")}>All People</li>
              <li onClick={() => setFilter("friends")}>Your Friends</li>
              <li onClick={() => setFilter("requests")}>Friend Request</li>
              <li onClick={() => setFilter("suggestions")}>
                Friend suggestions
              </li>
            </ul>
          </div>
        </div>

        <div className="search-result-main">
          {/* Friends Container */}
          {(filter === "all" || filter === "friends") && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Your Friends </h3>
              </div>

              {friends?.length < 1 ? (
                <p>You have no friends yet!</p>
              ) : (
                <>
                  <div className="search-result-main-container-body">
                    {friendsLoading ? (
                      <Loader type="list" />
                    ) : (
                      <>
                        {friends?.map((friend) => {
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
                  </div>
                </>
              )}
            </div>
          )}

          {/* Friend Requests container */}
          {(filter === "all" || filter === "requests") && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Friend Requests </h3>
              </div>
              {friendRequests?.length < 1 ? (
                <p>You have no pending friend requests!</p>
              ) : (
                <>
                  <div className="search-result-main-container-body">
                    {friendRequestsLoading ? (
                      <Loader type="list" />
                    ) : (
                      <>
                        {friendRequests?.map((request) => {
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
                                  onClick={() =>
                                    acceptFriendRequest(
                                      axiosInstance,
                                      request,
                                      queryClient
                                    )
                                  }
                                >
                                  Accept
                                </button>
                                <button
                                  className="btn-secondary"
                                  onClick={() =>
                                    deleteFriendRequest(
                                      axiosInstance,
                                      request,
                                      queryClient
                                    )
                                  }
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
          {(filter === "all" || filter === "suggestions") && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Friend Suggestions </h3>
              </div>

              <div className="search-result-main-container-body">
                {usersLoading ? (
                  <Loader type="list" />
                ) : (
                  <>
                    {users?.map((user) => {
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
                                    sendFriendRequest(
                                      axiosInstance,
                                      currentUser.user_id,
                                      user
                                    )
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
