import * as types from './actions/types';
import { authReducer } from './reducers/authReducer';
import { feedbackReducer } from './reducers/feedbackReducer';
import { friendReducer } from './reducers/friendReducer';
import { friendRequestReducer } from './reducers/friendRequestReducer';
import { soloStreakReducer } from './reducers/soloStreakReducer';
import { teamStreakReducer } from './reducers/teamStreakReducer';
import { userReducer } from './reducers/userReducer';
import { AppActions } from './actions/types';
import { getSharedActions } from './actions/getSharedActions';
import CognitoPayload from './cognitoPayload';
import { combineReducers } from 'redux';

const sharedReducers = {
    auth: authReducer,
    feedback: feedbackReducer,
    friends: friendReducer,
    friendRequests: friendRequestReducer,
    soloStreaks: soloStreakReducer,
    teamStreaks: teamStreakReducer,
    users: userReducer,
};

const sharedReducer = combineReducers({
    ...sharedReducers,
});

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
    AppActions,
    CognitoPayload,
    getSharedActions,
    sharedReducer,
};
