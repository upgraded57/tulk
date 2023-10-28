import React, { useState } from "react";

// styles
import "./userPhotos.css";
import { useNavigate } from "react-router-dom";
import MediaModal from "../../pages/Profile/MediaModal";

export default function UserPhotos({ photos, user }) {
  const navigate = useNavigate();

  const [mediaModal, setMediaModal] = useState(false);
  return (
    <>
      <div className="user-photos-div">
        {(photos?.length === 0 || !photos) && <p>No media to display yet</p>}
        <div className="profile-photos-media">
          {photos && photos[0] && (
            <div
              className="profile-media"
              onClick={() => navigate("/posts/" + photos[0].post)}
            >
              <img src={photos[0].file} alt="" />
            </div>
          )}

          {photos && photos[1] && (
            <div
              className="profile-media"
              onClick={() => navigate("/posts/" + photos[1].post)}
            >
              <img src={photos[1].file} alt="" />
            </div>
          )}

          {photos && photos[2] && (
            <div
              className="profile-media"
              onClick={() => navigate("/posts/" + photos[2].post)}
            >
              <img src={photos[2].file} alt="" />
            </div>
          )}

          {photos && photos[3] && (
            <div
              className="profile-media"
              onClick={() => navigate("/posts/" + photos[3].post)}
            >
              <img src={photos[3].file} alt="" />
            </div>
          )}

          {photos && photos[4] && (
            <div
              className="profile-media"
              onClick={() => navigate("/posts/" + photos[4].post)}
            >
              <img src={photos[4].file} alt="" />
            </div>
          )}

          {photos && photos[5] && (
            <div
              className="profile-media"
              onClick={() => navigate("/posts/" + photos[5].post)}
            >
              <img src={photos[5].file} alt="" />
            </div>
          )}

          {photos && photos[6] && (
            <div
              className="profile-media"
              onClick={() => navigate("/posts/" + photos[6].post)}
            >
              <img src={photos[6].file} alt="" />
            </div>
          )}

          {photos && photos[7] && (
            <div
              className="profile-media"
              onClick={() => navigate("/posts/" + photos[7].post)}
            >
              <img src={photos[7].file} alt="" />
            </div>
          )}

          {photos && photos[8] && (
            <div
              className="profile-media"
              onClick={() => navigate("/posts/" + photos[8].post)}
            >
              <img src={photos[8].file} alt="" />
            </div>
          )}
        </div>

        {photos && photos?.length > 9 && (
          <div
            className="see-all-user-photos-btn"
            onClick={() => setMediaModal(true)}
          >
            See All
          </div>
        )}
      </div>
      {mediaModal && (
        <MediaModal photos={photos} setMediaModal={setMediaModal} user={user} />
      )}
    </>
  );
}
