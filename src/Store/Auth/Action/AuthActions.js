import {
  INITIATE_LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from "../ActionTypes/AuthActionTypes";

export const initiateLoginUser = () => {
  return {
    type: INITIATE_LOGIN_USER,
  };
};

export const loginUserSuccess = (tokens) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: tokens,
  };
};

export const loginUserFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
