import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
} from '../actions/actionTypes';

const initialSignupState = {
  user: {},
  error: null,
  isSignedUp: false,
  inProgress: false,
};

export default function signup(state = initialSignupState, action) {
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        isSignedUp: true,
        inProgress: false,
        error: null,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    default:
      return {
        ...state,
      };
  }
}
