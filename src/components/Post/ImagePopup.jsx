import React from "react";
import "./post.css";

import { AiOutlineClose } from "react-icons/ai";
export default function ImagePopup({ image, setShowImagePopup }) {
  return (
    <>
      <div className="image-popup-backdrop"></div>
      <div className="image-popup">
        <div className="image-popup-container">
          <img src={image} alt="" />
        </div>
        <div className="close-btn">
          <AiOutlineClose
            className="icon"
            onClick={() => setShowImagePopup(false)}
          />
        </div>
      </div>
    </>
  );
}
