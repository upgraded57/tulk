import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../Axios/axiosInstance";

// styles
import "../Signup/signup.css";

// icons
import { IoIosClose } from "react-icons/io";

// user data
import { Userdata } from "../../data/Userdata";

// react hot toast
import toast from "react-hot-toast";

export default function Signup({ setEditProfileModalIsVisible }) {
  const user = Userdata();
  // const authAxios = axiosInstance();

  // Refs
  const first_nameRef = useRef();
  const last_nameRef = useRef();
  const DOBRef = useRef();
  const genderRef = useRef();
  const schoolRef = useRef();
  const maritalStatusRef = useRef();
  const bioRef = useRef();
  const websiteRef = useRef();
  const locationRef = useRef();

  const getProfileUpdateData = (e) => {
    e.preventDefault();

    const updateData = {
      school: schoolRef.current.value,
      marital_status: maritalStatusRef.current.value,
      bio: bioRef.current.value,
      website: websiteRef.current.value,
      location: locationRef.current.value,
      first_name: first_nameRef.current.value,
      last_name: last_nameRef.current.value,
      date_of_birth: DOBRef.current.value,
      gender: genderRef.current.value,
      // email: user.email,
      // phone_number: user.phone,
    };

    console.log(updateData);

    const postData = async () => {
      const toastId = toast.loading("Updating your profile");

      // post data to server
      await axiosInstance({
        method: "put",
        url: `https://tulk.azurewebsites.net/userprofiles/${user.user_id}/`,
        updateData,
      })
        .then((res) => {
          console.log(res.data);
          toast.success("Data updated successfully", {
            id: toastId,
          });
          // setEditProfileModalIsVisible(false);
          localStorage.setItem("user", JSON.stringify(res.data));
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to update. Try again", {
            id: toastId,
          });
        });
    };

    postData();
  };

  return (
    <div className="signupPage">
      <div className="signup">
        <div className="signup-header">
          <div className="easy-signup">
            <h2 className="h-200">Update your profile</h2>
          </div>
          <div
            className="signup-close-btn"
            onClick={() => {
              setEditProfileModalIsVisible(false);
            }}
          >
            <IoIosClose />
          </div>
        </div>

        <form className="signup-body">
          <div className="signup-body-inputs">
            <span>
              <input
                type="text"
                placeholder={
                  user?.first_name ? user.first_name : "First Name ..."
                }
                ref={first_nameRef}
              />
              <input
                type="text"
                placeholder={user?.last_name ? user.last_name : "Last Name ..."}
                ref={last_nameRef}
              />
            </span>
            <input
              type="text"
              placeholder={
                user?.location ? user.location : "Residential Address ..."
              }
              ref={locationRef}
            />
            <span>
              <input
                type="text"
                placeholder={user?.school ? user.school : "School ..."}
                ref={schoolRef}
              />
              <input
                type="text"
                placeholder={user?.website ? user.website : "Website ..."}
                ref={websiteRef}
              />
            </span>
            <input
              type="text"
              placeholder={user?.bio ? user.bio : "Bio ..."}
              ref={bioRef}
            />

            <span>
              <div className="gender-input">
                <p>Gender</p>
                <select
                  name="marital-status--input"
                  id="marital-status--input"
                  className="mt-xsm"
                  ref={genderRef}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>

              <div className="gender-input">
                <p>Marital Status</p>
                <select
                  name="marital-status--input"
                  id="marital-status--input"
                  className="mt-xsm"
                  ref={maritalStatusRef}
                >
                  <option value="SINGLE">Single</option>
                  <option value="MARRIED">Married</option>
                  <option value="DIVORCED">Divorced</option>
                  <option value="COMPLICATED">Complicated</option>
                  <option value="I'D RATHER NOT SAY">I'd Rather Not Say</option>
                </select>
              </div>
            </span>
            <div className="signup-body-input-dob">
              <p>Date of Birth</p>
              <input type="date" className="mt-xsm" ref={DOBRef} />
            </div>
          </div>
          <div className="signup-btn">
            <button
              className="btn-solid"
              type="submit"
              onClick={(e) => getProfileUpdateData(e)}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
