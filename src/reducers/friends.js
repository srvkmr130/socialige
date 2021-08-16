import {
  FETCH_FRIENDS_SUCCESS,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from '../actions/actionTypes';

const defaultProfileState = [];

export default function friends(state = defaultProfileState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    case ADD_FRIEND:
      return state.concat(action.friend); // this will append the new friend to the existing array of friends.
    case REMOVE_FRIEND:
      const newFriendList = state.filter(
        (friend) => friend.to_user._id !== action.userId
      ); // this will remove the selected friend to the existing array of friends.

      return newFriendList;
    default:
      return state;
  }
}
