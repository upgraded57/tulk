import React from "react";

import "./loader.css";

export default function Loader({ type }) {
  switch (type) {
    case "post":
      return (
        <>
          <div className="post-loader">
            <div className="post-loader__user">
              <div className="post-loader__user-avatar"></div>
              <div className="post-loader__user-data">
                <div className="post-loader__user-data-name"></div>
                <div className="post-loader__user-data-subtitle"></div>
              </div>
            </div>
            <div className="post-loader__media"></div>
            <div className="post-loader__content">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="post-loader">
            <div className="post-loader__user">
              <div className="post-loader__user-avatar"></div>
              <div className="post-loader__user-data">
                <div className="post-loader__user-data-name"></div>
                <div className="post-loader__user-data-subtitle"></div>
              </div>
            </div>
            <div className="post-loader__media"></div>
            <div className="post-loader__content">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="post-loader">
            <div className="post-loader__user">
              <div className="post-loader__user-avatar"></div>
              <div className="post-loader__user-data">
                <div className="post-loader__user-data-name"></div>
                <div className="post-loader__user-data-subtitle"></div>
              </div>
            </div>
            <div className="post-loader__media"></div>
            <div className="post-loader__content">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </>
      );

    case "list":
      return (
        <>
          <div className="list-loader">
            <div className="list-loader__avatar"></div>
            <div className="list-loader__content">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="list-loader">
            <div className="list-loader__avatar"></div>
            <div className="list-loader__content">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="list-loader">
            <div className="list-loader__avatar"></div>
            <div className="list-loader__content">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="list-loader">
            <div className="list-loader__avatar"></div>
            <div className="list-loader__content">
              <span></span>
              <span></span>
            </div>
          </div>
        </>
      );

    case "grid":
      return (
        <>
          <div className="grid-loader">
            <div className="grid-loader-grid">
              <div className="grid-loader-grid__card"></div>
              <span></span>
              <span></span>
            </div>
            <div className="grid-loader-grid">
              <div className="grid-loader-grid__card"></div>
              <span></span>
              <span></span>
            </div>
            <div className="grid-loader-grid">
              <div className="grid-loader-grid__card"></div>
              <span></span>
              <span></span>
            </div>
          </div>
        </>
      );

    case "spinner":
      return (
        <div className="loader">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );

    default:
      return (
        <div className="loader">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
  }
}
