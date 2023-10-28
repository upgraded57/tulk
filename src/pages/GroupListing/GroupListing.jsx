import React, { useState } from "react";
import { Link } from "react-router-dom";
// styles
import "../SearchResult/searchResult.css";

// components
import Navbar from "../../components/Navbar/Navbar";

// hooks
import UseFetchUserGroups from "./../../Hooks/User/UseFetchUserGroups";
import UseFetchGroups from "./../../Hooks/Group/UseFetchGroups";

export default function SearchResult() {
  // function to filter search result (variables)
  const [filter, setFilter] = useState("all");

  const { data: groups } = UseFetchGroups();

  const { data: userGroups } = UseFetchUserGroups();

  console.log(userGroups);
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
              <li onClick={() => setFilter("all")}>All Groups</li>
              <li onClick={() => setFilter("joined")}>Joined Groups</li>
              <li onClick={() => setFilter("unjoined")}>Unjoined Groups</li>
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
          {(filter === "all" || filter === "joined") && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">Groups you've joined</h3>
              </div>

              {userGroups?.length < 1 ? (
                <p>You haven't joined any group yet</p>
              ) : (
                <>
                  <div className="search-result-main-container-body">
                    {userGroups?.map((userGroup) => {
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
                  </div>
                </>
              )}
            </div>
          )}

          {/* All groups Container */}
          {(filter === "all" || filter === "unjoined") && (
            <div className="search-result-main-container">
              <div className="search-result-main-container-header">
                <h3 className="h-100">All Groups</h3>
              </div>

              {groups?.length < 1 ? (
                <p>No groups on TULK yet. Check back later or create one!</p>
              ) : (
                <>
                  <div className="search-result-main-container-body">
                    {groups?.map((group) => {
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
