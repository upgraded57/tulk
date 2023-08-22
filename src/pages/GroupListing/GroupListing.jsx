import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Axios/axiosInstance";
// styles
import "../SearchResult/searchResult.css";

// components
import Navbar from "../../components/Navbar/Navbar";

// images
import { fetchGroups, fetchUserGroups } from "../../Axios/ApiCalls";

export default function SearchResult() {
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

  // get all groups
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    fetchGroups(setGroups);
  }, []);

  // get user groups
  const [userGroups, setUserGroups] = useState([]);
  useEffect(() => {
    fetchUserGroups(setUserGroups);
  }, []);

  return (
    <>
      <Navbar />
      <div className="search-result">
        <div className="group-listing-filter">
          <div className="group-listing-filter-header">
            <h2 className="h-200">Groups</h2>
            <div className="create-group-btn-mobile">
              <Link to="/groups/create">
                <button className="btn-solid">Create Group</button>
              </Link>
            </div>
          </div>

          <div className="group-listing-filter-list">
            <ul>
              <li onClick={showAllFilter}>All Groups</li>
              <li onClick={showPeopleFilter}>Joined Groups</li>
              <li onClick={showGroupsFilter}>Unjoined Groups</li>
            </ul>
          </div>
          <div className="create-group-btn-desktop">
            <Link to="/groups/create">
              <button className="btn-solid">Create Group</button>
            </Link>
          </div>
        </div>

        <div className="search-result-main">
          {/* user groups Container */}
          {showPeople && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Groups you've joined</h3>
              </div>

              {userGroups.length < 1 ? (
                <p>You haven't joined any group yet</p>
              ) : (
                <>
                  <div className="search-result-main-container-body">
                    {userGroups.map((userGroup) => {
                      return (
                        <div
                          className="search-result-main-container-body-list"
                          key={userGroup.id}
                        >
                          <Link to={userGroup.id}>
                            <div className="search-result-main-container-body-list-image">
                              <img src={userGroup.avatar} alt="" />
                            </div>

                            <div className="search-result-main-container-body-list-content">
                              <p className="text-body">{userGroup.name}</p>
                              <p className="small-text">{userGroup.location}</p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                    <div className="load-more-link">
                      <Link to="#">Load More</Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* All groups Container */}
          {showGroups && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">New Groups</h3>
              </div>

              {groups.length < 1 ? (
                <p>No groups on TULK yet. Check back later!</p>
              ) : (
                <>
                  <div className="search-result-main-container-body">
                    {groups.map((group) => {
                      return (
                        <div
                          className="search-result-main-container-body-list"
                          key={group.id}
                        >
                          <Link to={group.id}>
                            <div className="search-result-main-container-body-list-image">
                              <img src={group.avatar} alt="" />
                            </div>

                            <div className="search-result-main-container-body-list-content">
                              <p className="text-body">{group.name}</p>
                              <p className="small-text">{group.location}</p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                    <div className="load-more-link">
                      <Link to="#">Load More</Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
