import {
  INITIATE_REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from "../Register/ActionTypes/RegisterActionTypes";

const initialState = {
  loading: false,
  newUser: null,
  error: "",
};

export const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_REGISTER_USER:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        newUser: action.payload,
        error: "",
      };

    case REGISTER_USER_FAILURE:
      return {
        loading: false,
        newUser: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
