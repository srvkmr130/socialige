import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import signup from './signup';
import profile from './profile';
import friends from './friends';
import search from './search';

// here we combine all the states into a single state
export default combineReducers({
  posts,
  auth,
  signup,
  profile,
  friends,
  search,
});
