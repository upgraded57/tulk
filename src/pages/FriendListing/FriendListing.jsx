import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// styles
import "../SearchResult/searchResult.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";

// components
import Navbar from "../../components/Navbar/Navbar";
import FetchLoading from "../../components/FetchLoading/FetchLoading";

// api calls
import {
  acceptFriendRequest,
  deleteFriendRequest,
  fetchFriendRequests,
  fetchUserFriends,
  fetchUsers,
  sendFriendRequest,
} from "../../Axios/ApiCalls";
import { Userdata } from "../../data/Userdata";

export default function SearchResult() {
  const currentUser = Userdata();
  // function to filter search result (variables)
  const [showPeople, setShowPeople] = useState(true);
  const [showGroups, setShowGroups] = useState(true);

  // function to filter search result to show all
  const showAllFilter = () => {
    setShowPeople(true);
    setShowGroups(true);
  };

  // function to filter search result to show only people
  const showPeopleFilter = () => {
    if (!showPeople) {
      setShowPeople(true);
    }
    setShowGroups(false);
  };

  // function to filter search result to show only groups
  const showGroupsFilter = () => {
    if (!showGroups) {
      setShowGroups(true);
    }
    setShowPeople(false);
  };

  // loading status
  const [loading, setLoading] = useState(true);
  // get all friends
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetchUserFriends(setFriends, setLoading);
  }, []);

  // get all friends
  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    fetchFriendRequests(setFriendRequests, setLoading);
  }, []);

  // get all users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers(setUsers, setLoading);
  }, []);

  // friends array
  const friendsArray = [];
  friends.forEach((friend) => {
    friendsArray.push(friend.user1_data.id);
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
              <li onClick={showAllFilter}>All Friends</li>
              <li onClick={showPeopleFilter}>Friend Request</li>
              <li onClick={showGroupsFilter}>Friend suggestions</li>
            </ul>
          </div>
        </div>

        <div className="search-result-main">
          {/* People Container */}
          {showPeople && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Your Friends </h3>
              </div>

              {friends.length < 1 ? (
                <p>You have no friends yet!</p>
              ) : (
                <>
                  <div className="search-result-main-container-body">
                    {loading ? (
                      // <FetchLoading />
                      <p>Loading...</p>
                    ) : (
                      <>
                        {friends.map((friend) => {
                          return (
                            <div
                              className="search-result-main-container-body-list"
                              key={friend.id}
                            >
                              <Link to={`/profile/${friend.user1_data.id}/`}>
                                <div className="search-result-main-container-body-list-image">
                                  <img
                                    src={
                                      friend.user1_data.avatar
                                        ? friend.user1_data.avatar
                                        : noAvatar
                                    }
                                    alt=""
                                  />
                                </div>

                                <div className="search-result-main-container-body-list-content">
                                  <p className="text-body">{`${friend.user1_data.first_name} ${friend.user1_data.last_name}`}</p>
                                  <p className="small-text">
                                    {friend.user1_data.bio
                                      ? friend.user1_data.bio?.length < 80
                                        ? friend.user1_data.bio
                                        : friend.user1_data.bio?.slice(0, 80) +
                                          "..."
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
                    {loading ? (
                      <p>Loading...</p>
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

          {/* Groups Container */}
          {showGroups && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Friend Suggestions </h3>
              </div>

              <div className="search-result-main-container-body">
                {loading ? (
                  <p>Loading... </p>
                ) : (
                  <>
                    {users
                      .filter((user) => !friendsArray.includes(user.id))
                      .map((user) => {
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
                              {user.id !== currentUser.user_id && (
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
