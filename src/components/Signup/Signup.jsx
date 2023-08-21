import React, { useState, useRef } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// styles
import "./signup.css";

// react hot toast
import toast from "react-hot-toast";

// icons
import { IoIosClose } from "react-icons/io";
import {
  initiateRegisterUser,
  registerUserFailure,
  registerUserSuccess,
} from "../../Store/Register/Action/RegisterActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup({ setSignupModalVisible }) {
  const [verifyOTPModal, setVerifyOTPModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [errors, setErrors] = useState([]);
  // signup data
  const firstnameRef = useRef();
  const surnameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const DOBRef = useRef();
  const genderRef = useRef();

  const getSignupData = async (e) => {
    e.preventDefault();
    const firstname = firstnameRef.current.value;
    const surname = surnameRef.current.value;
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const DOB = DOBRef.current.value;
    const gender = genderRef.current.value;

    if (password === confirmPassword) {
      const signupFormData = {
        first_name: firstname,
        last_name: surname,
        phone_number: phone,
        email,
        password,
        confirm_password: confirmPassword,
        date_of_birth: DOB,
        gender,
      };

      dispatch(initiateRegisterUser);
      const toastId = toast.loading("Creating your profile...");
      await axios({
        method: "post",
        url: "https://tulk-social-f7f4f4c56190.herokuapp.com/register/",
        data: signupFormData,
      })
        .then((res) => {
          dispatch(registerUserSuccess(res.data));
          toast.success("Registration Successful!", {
            id: toastId,
          });
          navigate("/verify-OTP");
        })

        .catch((err) => {
          dispatch(registerUserFailure(err.message));
          console.log(err);

          if (err.response.data.email) {
            toast.error(err.response.data.email[0], {
              id: toastId,
            });
          } else if (err.response.data.phone_number) {
            toast.error(err.response.data.phone_number[0], {
              id: toastId,
            });
          } else {
            toast.error("Something went wrong. Please retry");
          }
        });
    } else {
      console.log("Passwords do not match");
      alert("Passwords do not match");
      return;
    }
  };

  return (
    <div className="signupPage">
      <div className="signup">
        <div className="signup-header">
          <div className="easy-signup">
            <h2 className="h-200">
              <span>Easy</span> <br />
              Sign Up
            </h2>
          </div>
          <div
            className="signup-close-btn"
            onClick={() => {
              setSignupModalVisible(false);
            }}
          >
            <IoIosClose />
          </div>
        </div>

        <form className="signup-body" onSubmit={(e) => getSignupData(e)}>
          <div className="signup-body-inputs">
            <span>
              <input
                type="text"
                placeholder="First Name ..."
                ref={firstnameRef}
                required
              />
              <input
                type="text"
                placeholder="Surname Name ..."
                ref={surnameRef}
                required
              />
            </span>
            <input
              type="text"
              placeholder="Mobile Number"
              ref={phoneRef}
              required
            />
            <input
              type="text"
              placeholder="Email Address ..."
              ref={emailRef}
              required
            />
            <input
              type="password"
              placeholder="New Password ..."
              ref={passwordRef}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password ..."
              ref={confirmPasswordRef}
              required
            />

            <div className="signup-body-input-dob">
              <p>Date of Birth</p>
              <input type="date" className="mt-xsm" ref={DOBRef} required />
            </div>
            <div className="gender-input">
              <p>Gender</p>
              <select
                name="gender-input"
                id="gender-input"
                className="mt-xsm"
                ref={genderRef}
                required
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
          </div>

          <div className="signup-body-terms mt-md">
            <p>
              By clicking Sign Up, you agree to our <a href="#">Terms</a>,{" "}
              <a href="#">Privacy Policy</a> and
              <a href="#">Cookies Policy</a>. You may receive SMS notifications
              from us and can opt out at any time.
            </p>
          </div>
          <div className="signup-btn">
            <button className="btn-solid" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
