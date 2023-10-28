import { IoIosClose } from "react-icons/io";
import "./../../components/Signup/signup.css";
import "./profile.css";
import { useNavigate } from "react-router-dom";

export default function MediaModal({ user, photos, setMediaModal }) {
  const navigate = useNavigate();
  return (
    <div className="signupPage">
      <div className="signup">
        <div className="signup-header">
          <div className="easy-signup">
            <h2 className="h-200">{`${user.first_name}'s Media`}</h2>
          </div>
          <div
            className="signup-close-btn"
            onClick={() => {
              setMediaModal(false);
            }}
          >
            <IoIosClose />
          </div>
        </div>

        <div className="photo-media-modal">
          <div className="media-modal-images">
            {photos.map((photo) => (
              <div className="media-modal-image" key={photo.id}>
                <img
                  src={photo.file}
                  alt=""
                  onClick={() => navigate(`/posts/${photo.post}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
