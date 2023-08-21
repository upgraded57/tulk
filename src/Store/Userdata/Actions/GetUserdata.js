import {
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
} from "../ActionTypes/GetUserdataType";

export const getUserDataSuccess = (currentUser) => {
  return {
    type: GET_USER_DATA_SUCCESS,
    payload: currentUser,
  };
};

export const getUserDataFailure = (error) => {
  return {
    type: GET_USER_DATA_FAILURE,
    payload: error,
  };
};
