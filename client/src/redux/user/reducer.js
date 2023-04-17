import { SET_HAS_SID_COOKIE, SET_SESSION } from "./types";

const initialState = {
  hasSidCookie: false,
  session: null,
};

const sidCookieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HAS_SID_COOKIE:
      return {
        ...state,
        hasSidCookie: action.payload,
      };
    case SET_SESSION:
      return {
        ...state,
        session: action.payload,
      };
    default:
      return state;
  }
};

export default sidCookieReducer;
