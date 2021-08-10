import { APIUrls } from '../helpers/url';
import { getFormBody } from '../helpers/utils';
import { LOGIN_START } from './actionTypes';

export default function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function login(email, password) {
  return (dispatch) => {
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST', // beacuse we dont want values to be visibe in address bar
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // this we need to write because the API doesn't accept JSON format
      },
      body: getFormBody({ email, password }),
    });
  };
}
