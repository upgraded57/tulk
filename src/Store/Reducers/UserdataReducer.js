import {
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
} from "../Userdata/ActionTypes/GetUserdataType";

const initialState = {
  currentUser: {
    id: "f3c48095-96c3-43c5-89a5-32a730b197bd",
    first_name: "Shokunbi",
    last_name: "Micheal",
    date_of_birth: "2005-03-02",
    gender: "MALE",
    email: "shokunbiupgraded@gmail.com",
    phone_number: "2349027538937",
    avatar:
      "https://res.cloudinary.com/hyklbuwof/raw/upload/v1/media/user_avatar/warren-umoh-kkQYlWpZwX0-unsplash_lplzbe.jpg",
    background_image:
      "https://res.cloudinary.com/hyklbuwof/raw/upload/v1/media/cover_image/andrew-peluso-gQXusioL0Os-unsplash_0jMdtKU.jpg",
    school: "Bookers College",
    marital_status: "SINGLE",
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    website: "https://newsite.com",
    location: "Sauban street, Titilayo, Ososun titun",
  },
  error: null,
};

export const UserdataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };

    case GET_USER_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
