import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import signup from './signup';
import profile from './profile';
import friends from './friends';

export default combineReducers({
  posts,
  auth,
  signup,
  profile,
  friends,
});
