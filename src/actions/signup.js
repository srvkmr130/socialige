import { APIUrls } from '../helpers/url';
import { getFormBody } from '../helpers/utils';
import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED } from './actionTypes';

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}
export function SignupFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error: errorMessage,
  };
}
export function SignupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}
export function signup(email, name, password, confirm_password) {
  return (dispatch) => {
    dispatch(startSignup());
    const url = APIUrls.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, name, password, confirm_password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          dispatch(SignupSuccess(data.data.user));
        } else dispatch(SignupFailed(data.message));
      });
  };
}
