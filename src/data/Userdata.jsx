import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Userdata = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  // get current user from store
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // current user
  useEffect(() => {
    const fetchUser = () => {
      if (!currentUser) {
        navigate("/login");
        if (localStorage.getItem("tokens")) {
          localStorage.removeItem("tokens");
        }
      } else {
        setUser({
          fullname: `${currentUser.first_name} ${currentUser.last_name}`,
          email: currentUser.email,
          user_id: currentUser.id,
          avatar: currentUser.avatar,
          cover: currentUser.background_image,
          school: currentUser.school,
          location: currentUser.location,
          marital_status: currentUser.marital_status,
          bio: currentUser.bio,
          DOB: currentUser.date_of_birth,
          phone: currentUser.phone_number,
          website: currentUser.website,
          is_staff: currentUser.is_staff,
        });
      }
    };

    fetchUser();
  }, []);

  return user;
};
