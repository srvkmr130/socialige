import { APIUrls } from '../helpers/url';
import { getFormBody } from '../helpers/utils';
import {
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
} from './actionTypes';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST', // beacuse we dont want values to be visibe in address bar
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // this we need to write because the API doesn't accept JSON format
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          dispatch(loginSuccess(data.data.user));
        } else dispatch(loginFailed(data.message));
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

export function clearAuthSatate() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
