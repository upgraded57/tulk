import React from "react";

// styles
import "./forgotPassword.css";

// icons
import { IoIosClose } from "react-icons/io";

export default function ForgotPassword({ setShowForgotPassword }) {
  return (
    <div className="signupPage">
      <div className="signup">
        <div className="signup-header">
          <div className="easy-signup">
            <h2 className="h-200">Forgotten Password?</h2>
          </div>
          <div
            className="signup-close-btn"
            onClick={() => {
              setShowForgotPassword(false);
            }}
          >
            <IoIosClose />
          </div>
        </div>

        <div className="signup-body">
          <div className="signup-body-inputs">
            <input type="text" placeholder="Enter email or phone number" />
            <div className="signup-btn">
              <button className="btn-solid">Reset Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
