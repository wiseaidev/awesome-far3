import {
  UPDATE_AUTH_USER,
} from "../../../constants/ActionTypes";

export const setAuthUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};
