import {
  INITIATE_LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from "../Auth/ActionTypes/AuthActionTypes";

const initialState = {
  loading: false,
  token: null,
  error: "",
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_LOGIN_USER:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_USER_SUCCESS:
      return {
        loading: false,
        token: action.payload,
        error: "",
      };

    case LOGIN_USER_FAILURE:
      return {
        loading: false,
        token: null,
        error: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        token: null,
        error: null,
      };

    default:
      return state;
  }
};
