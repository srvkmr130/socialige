import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import signup from './signup';

export default combineReducers({
  posts,
  auth,
  signup,
});
