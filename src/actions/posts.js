import { APIUrls } from '../helpers/url';
import { UPDATE_POSTS } from './actionTypes';

export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts(1, 5);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
