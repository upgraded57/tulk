import React, { useRef, useState } from "react";
import { loginCall } from "../../Axios/ApiCalls";
import { useDispatch } from "react-redux";

// styles
import "./login.css";

// images
import logo from "../../images/logo.png";
import welcomeImg from "../../images/TULK-hot-1.png";

// pages
import Newsreel from "../../components/Newsreel/Newsreel";
import Signup from "../../components/Signup/Signup";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // variable to store sign up active state
  const [signupModalVisible, setSignupModalVisible] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // variable to hold login Data body
  let data;

  // function to open signup page modal when signup button is clicked
  const showSignUpModal = () => {
    setSignupModalVisible(true);
  };

  // login user data refs
  const loginPhoneEmailRef = useRef();
  const loginPasswordRef = useRef();

  // function to get login data
  const getLoginData = (e) => {
    e.preventDefault();

    const phoneOrEmail = loginPhoneEmailRef.current.value;
    const password = loginPasswordRef.current.value;

    // Formats login phone number to 234*** format
    const loginData = () => {
      let unformattedPhone = Array.from(phoneOrEmail);
      if (unformattedPhone[0] === "0") {
        unformattedPhone.shift();
        const formattedPhone = unformattedPhone;
        formattedPhone.unshift("234");
        return {
          phone_number: formattedPhone.join(""),
          password: password,
        };
      } else if (unformattedPhone[0] === "+") {
        unformattedPhone.shift();
        const formattedPhone = unformattedPhone;
        return {
          phone_number: formattedPhone.join(""),
          password,
        };
      } else {
        return {
          phone_number: unformattedPhone.join(""),
          password,
        };
      }
    };

    data = loginData();

    loginCall(data, dispatch, navigate);
  };

  return (
    <>
      <div className="login-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="login">
        <div className="login-left">
          <div className="welcome-img">
            <img src={welcomeImg} alt="" />
          </div>
          <div className="login-form">
            <form className="login" onSubmit={(e) => getLoginData(e)}>
              <input
                type="text"
                placeholder="Email or Phone Number ..."
                required
                ref={loginPhoneEmailRef}
              />
              <input
                type="password"
                placeholder="Password"
                required
                ref={loginPasswordRef}
              />

              <button type="submit" className="btn-solid">
                Login
              </button>
            </form>
            <div className="forgotten-password-link mt-xsm">
              <p
                onClick={() => setShowForgotPassword(true)}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Forgotten Password?
              </p>
            </div>
            <h2 className="h-100">OR</h2>
            <div className="signup-btn-modal-popup">
              <button className="btn-secondary" onClick={showSignUpModal}>
                Create Account
              </button>
            </div>
          </div>
        </div>

        {/* Signup Modal */}
        {signupModalVisible && (
          <Signup setSignupModalVisible={setSignupModalVisible} />
        )}

        {/* forgot password modal */}
        {showForgotPassword && (
          <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
        )}

        <div className="login-right">
          <div className="news-nav">
            <ul>
              <li className="active">All News</li>
              <li>Sport</li>
              <li>Politics</li>
              <li>Metro</li>
              <li>Entertainment & More</li>
            </ul>
          </div>
          <Newsreel loginPage />
        </div>
      </div>
    </>
  );
}
