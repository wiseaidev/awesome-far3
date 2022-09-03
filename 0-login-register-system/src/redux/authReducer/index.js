import {
  UPDATE_AUTH_USER
} from "../../constants/ActionTypes";

const initialState = {
  authUser: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        authUser: action.payload,
        loadUser: true,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
