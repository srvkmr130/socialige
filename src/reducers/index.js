import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import signup from './signup';
import profile from './profile';

export default combineReducers({
  posts,
  auth,
  signup,
  profile,
});
