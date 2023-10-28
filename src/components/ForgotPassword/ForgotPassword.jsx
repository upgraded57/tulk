import React, { useState } from "react";

// styles
import "../Signup/Signup";

// icons
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword({ setShowForgotPassword }) {
  const [resetStage, setResetStage] = useState("1");
  const [phone, setPhone] = useState("");

  const resetPassword = async () => {
    if (phone.length === 0) {
      toast.error("Enter your phone number");
      return;
    }
    const toastId = toast.loading("Sending reset OTP. Please wait");
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
      url: "https://tulk.azurewebsites.net/forgot-password/",
      data,
    })
      .then(() => {
        toast.success("OTP sent to your phone number", {
          id: toastId,
        });
        setResetStage("2");
      })
      .catch((err) => {
        toast.error(
          err.response?.data.message
            ? err.response.data.message
            : "Something went wrong",
          {
            id: toastId,
          }
        );
        console.log(err);
      });
  };

  // verify OTP
  const [otp, setOtp] = useState("");
  const verifyOTP = async () => {
    const toastId = toast.loading("Verifying OTP");
    await axios({
      method: "post",
      url: "https://tulk.azurewebsites.net/verify-password-otp/",
      data: otp,
    })
      .then((res) => {
        console.log(res.data);
        toast.success("OTP verififcation successful", {
          id: toastId,
        });
        setResetStage("3");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.status === 400
            ? "Wrong OTP. Verify and retry"
            : "Something went wrong",
          {
            id: toastId,
          }
        );
      });
  };

  // reset password
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const resetPass = async () => {
    if (pass1 === pass2) {
      const toastId = toast.loading("Resetting Password");
      await axios({
        method: "post",
        url: "https://tulk.azurewebsites.net/reset-password/",
        data: {
          password: pass1,
          confirm_password: pass2,
        },
      })
        .then((res) => {
          toast.success("Password reset successful", {
            id: toastId,
          });
          setShowForgotPassword(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong. Please retry", {
            id: toastId,
          });
        });
    } else {
      toast.error("Passwords do not match!");
    }
  };

  return (
    <div className="signupPage">
      <div className="signup">
        <div className="signup-header">
          <div className="easy-signup">
            <h2 className="h-200">
              {resetStage === "1"
                ? "Forgotten Password?"
                : resetStage === "2"
                ? "Enter OTP"
                : "Reset Password"}
            </h2>
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

        {resetStage === "1" && (
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
        )}

        {resetStage === "2" && (
          <div className="signup-body">
            <div className="signup-body-inputs">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
              <div className="signup-btn">
                <button className="btn-solid" onClick={verifyOTP}>
                  Verify OTP
                </button>
              </div>
            </div>
          </div>
        )}

        {resetStage === "3" && (
          <div className="signup-body">
            <div className="signup-body-inputs">
              <input
                type="password"
                placeholder="Enter new password"
                onChange={(e) => setPass1(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                onChange={(e) => setPass2(e.target.value)}
              />
              <div className="signup-btn">
                <button className="btn-solid" onClick={resetPass}>
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
