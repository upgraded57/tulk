import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Axios/axiosInstance";

// styles
import "./messageContacts.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";
import { getOnlineFriends } from "../../Axios/ApiCalls";
import { Userdata } from "../../data/Userdata";

export default function MessageContacts() {
  const user = Userdata();
  const [onlineFriends, setOnlineFriends] = useState([]);
  useEffect(() => {
    getOnlineFriends(axiosInstance, user.user_id, setOnlineFriends);
  }, [user.user_id]);

  return (
    <div className="message-contacts mt-lg">
      <div className="message-contacts-header">
        <h3 className="h-100">Message Contacts</h3>
        <div className="view-all-online-friend">
          <Link to="/friends" className="text-body">
            View All
          </Link>
        </div>
      </div>
      <div className="message-contact-online-friends">
        <div className="mt-md"></div>
        <ul className="message-contact-online-friends-list mt-sm">
          {onlineFriends[0] && (
            <li>
              <div className="online-friend-profile-img">
                <img
                  src={
                    onlineFriends[0].avatar ? onlineFriends[0].avatar : noAvatar
                  }
                  alt=""
                />
              </div>
              <p>{`${onlineFriends[0].first_name} ${onlineFriends[0].last_name}`}</p>
            </li>
          )}

          {onlineFriends[1] && (
            <li>
              <div className="online-friend-profile-img">
                <img
                  src={
                    onlineFriends[1].avatar ? onlineFriends[1].avatar : noAvatar
                  }
                  alt=""
                />
              </div>
              <p>{`${onlineFriends[1].first_name} ${onlineFriends[1].last_name}`}</p>
            </li>
          )}

          {onlineFriends[2] && (
            <li>
              <div className="online-friend-profile-img">
                <img
                  src={
                    onlineFriends[2].avatar ? onlineFriends[2].avatar : noAvatar
                  }
                  alt=""
                />
              </div>
              <p>{`${onlineFriends[2].first_name} ${onlineFriends[2].last_name}`}</p>
            </li>
          )}

          {onlineFriends[3] && (
            <li>
              <div className="online-friend-profile-img">
                <img
                  src={
                    onlineFriends[3].avatar ? onlineFriends[3].avatar : noAvatar
                  }
                  alt=""
                />
              </div>
              <p>{`${onlineFriends[3].first_name} ${onlineFriends[3].last_name}`}</p>
            </li>
          )}

          {onlineFriends[4] && (
            <li>
              <div className="online-friend-profile-img">
                <img
                  src={
                    onlineFriends[4].avatar ? onlineFriends[4].avatar : noAvatar
                  }
                  alt=""
                />
              </div>
              <p>{`${onlineFriends[4].first_name} ${onlineFriends[4].last_name}`}</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
