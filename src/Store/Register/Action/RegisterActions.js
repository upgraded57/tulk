import {
  INITIATE_REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from "../ActionTypes/RegisterActionTypes";

export const initiateRegisterUser = () => {
  return {
    type: INITIATE_REGISTER_USER,
  };
};

export const registerUserSuccess = (newUser) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: newUser,
  };
};

export const registerUserFailure = (error) => {
  return {
    type: REGISTER_USER_FAILURE,
    payload: error,
  };
};
