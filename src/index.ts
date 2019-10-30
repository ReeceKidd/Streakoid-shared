import * as types from './actions/types';
import { authReducer } from './reducers/authReducer';
import { feedbackReducer } from './reducers/feedbackReducer';
import { friendReducer } from './reducers/friendReducer';
import { friendRequestReducer } from './reducers/friendRequestReducer';
import { soloStreakReducer } from './reducers/soloStreakReducer';
import { teamStreakReducer } from './reducers/teamStreakReducer';
import { userReducer } from './reducers/userReducer';

const sharedReducers = {
    authReducer,
    feedbackReducer,
    friendReducer,
    friendRequestReducer,
    soloStreakReducer,
    teamStreakReducer,
    userReducer,
};

export {
    types,
    sharedReducers,
    authReducer,
    feedbackReducer,
    friendReducer,
    friendRequestReducer,
    soloStreakReducer,
    teamStreakReducer,
    userReducer,
};