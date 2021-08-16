import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from './actionTypes';
import { APIUrls } from '../helpers/url';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailure(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    console.log('FetchUserProfile', userId);
    dispatch(startUserProfileFetch());
    const url = APIUrls.userProfile(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // this we need to write because the API doesn't accept JSON format
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('datafor user profile', data);
        if (data.success) {
          dispatch(userProfileSuccess(data.data.user));
        } else dispatch(userProfileFailure(data.message));
      });
  };
}

export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}
