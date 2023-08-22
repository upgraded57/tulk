import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Axios/axiosInstance";
import { Link } from "react-router-dom";

import "./newPeople.css";

// images
import noAvatar from "../../images/noAvatar.jpeg";

export default function NewPeople() {
  const [newPeople, setNewPeople] = useState([]);

  const getNewPeople = async () => {
    await axiosInstance({
      method: "get",
      url: "/userprofiles/?page=1",
    })
      .then((res) => {
        setNewPeople(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNewPeople();
  }, []);

  return (
    <div className="newPeopleDiv mt-lg">
      <div className="newPeopleHeader">
        <h3 className="h-100">Who is new</h3>
        <div className="load-more-new-people">
          <Link to="/friends" className="text-body">
            More
          </Link>
        </div>
      </div>
      <div className="newPeople">
        {newPeople[0] && (
          <Link
            to={`profile/${newPeople[0].id}/`}
            title={`${newPeople[0].first_name} ${newPeople[0].last_name}`}
          >
            <div className="newPerson">
              <img src={newPeople[0].avatar || noAvatar} alt="" />
            </div>
          </Link>
        )}

        {newPeople[1] && (
          <Link
            to={`profile/${newPeople[1].id}/`}
            title={`${newPeople[1].first_name} ${newPeople[1].last_name}`}
          >
            <div className="newPerson">
              <img src={newPeople[1].avatar || noAvatar} alt="" />
            </div>
          </Link>
        )}

        {newPeople[2] && (
          <Link
            to={`profile/${newPeople[2].id}/`}
            title={`${newPeople[2].first_name} ${newPeople[2].last_name}`}
          >
            <div className="newPerson">
              <img src={newPeople[2].avatar || noAvatar} alt="" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
