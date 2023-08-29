import React, { useState } from "react";

// styles
import "./forgotPassword.css";

// icons
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword({ setShowForgotPassword }) {
  const [phone, setPhone] = useState("");

  const resetPassword = async () => {
    const toastId = toast.loading("Sending reset OTP");
    // formats phone number to 234... format
    const loginData = () => {
      let unformattedPhone = Array.from(phone);
      if (unformattedPhone[0] === "0") {
        unformattedPhone.shift();
        const formattedPhone = unformattedPhone;
        formattedPhone.unshift("234");
        return {
          phone_number: formattedPhone.join(""),
        };
      } else if (unformattedPhone[0] === "+") {
        unformattedPhone.shift();
        const formattedPhone = unformattedPhone;
        return {
          phone_number: formattedPhone.join(""),
        };
      } else {
        return {
          phone_number: unformattedPhone.join(""),
        };
      }
    };

    const data = loginData();

    await axios({
      method: "post",
      url: "https://tulk-social-f7f4f4c56190.herokuapp.com/forgot-password/",
      data,
    })
      .then((res) => {
        toast.success("Reset password sent to your phone number", {
          id: toastId,
        });
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          id: toastId,
        });
        console.log(err);
      });
  };
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
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="signup-btn">
              <button className="btn-solid" onClick={resetPassword}>
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
