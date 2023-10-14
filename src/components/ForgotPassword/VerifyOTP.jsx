import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// styles
import "./forgotPassword.css";
import axios from "axios";

// toast
import toast from "react-hot-toast";

export default function VerifyOTP() {
  const navigate = useNavigate();

  // selects detail of registering user
  // const newUser = useSelector((state) => state.register.newUser);
  const newUser = JSON.parse(localStorage.getItem("newUserData"));
  const newUID = newUser.user_id;

  const OTPRef = useRef();

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otp = OTPRef.current.value.replace(/\s/g, "");

    if (otp.trim().length !== 0) {
      await axios({
        method: "post",
        url: `https://tulk.azurewebsites.net/verify-otp/${newUID}/`,
        data: { otp },
      })
        .then((res) => {
          toast.success("Verification successful. Please login");
          navigate("/login");
          localStorage.removeItem("newUserData");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to verify OTP");
        });
    } else {
      alert("Enter OTP to proceed");
      console.log("Enter OTP to proceed");
      return;
    }
  };
  return (
    <div className="signupPage">
      <div className="signup" style={{ transform: "translateY(-20vh)" }}>
        <div className="signup-header">
          <div className="easy-signup">
            <h2 className="h-200">Verify OTP</h2>
            <p className="h-200">
              An OTP has been sent to the phone number you provided. Enter it to
              activate your account
            </p>
          </div>
        </div>

        <div className="signup-body">
          <div className="signup-body-inputs">
            <form onSubmit={(e) => handleVerifyOTP(e)}>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter OTP"
                ref={OTPRef}
              />
              <div className="signup-btn">
                <button className="btn-solid" type="submit">
                  Verify OTP
                </button>
              </div>
            </form>
            <div className="login-link">
              <p>Not signed up yet?</p>
              <Link to="/login">Sign Up </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
