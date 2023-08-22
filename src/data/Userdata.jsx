import { useEffect, useState } from "react";

export const Userdata = () => {
  const [user, setUser] = useState({});

  // current user
  useEffect(() => {
    // get current user from store
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const fetchUser = () => {
      if (!currentUser) {
        return;
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
