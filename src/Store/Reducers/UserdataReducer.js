import {
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
} from "../Userdata/ActionTypes/GetUserdataType";

const initialState = {
  currentUser: null,
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
