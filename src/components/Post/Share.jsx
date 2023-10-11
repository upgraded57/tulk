import React from "react";
import useFetchProfile from "./../../Hooks/User/useFetchProfile";
import noAvatar from "../../images/noAvatar.jpeg";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Share({ sharer }) {
  const { data: user } = useFetchProfile(sharer.user);
  return (
    <div className="engagement-like">
      <Link
        to={`/profile/${sharer.user}`}
        title={`${user?.first_name} ${user?.last_name}`}
      >
        <div className="liker-img">
          <img src={user?.avatar ? user?.avatar : noAvatar} alt="" />
        </div>
      </Link>
      <div className="liker-name">
        {user ? `${user?.first_name} ${user?.last_name}` : ""} <br />
        <small>
          Shared at <b> {moment(sharer.shared_at).format("MMM Do YYYY")}</b>
        </small>
      </div>
    </div>
  );
}
