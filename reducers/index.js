import { combineReducers } from 'redux';

import auth from './auth_reducer';
import jobs from './jobs_reducers';
import likedJobs from './like_reducer';

export default combineReducers({
  auth,
  jobs,
  likedJobs
});