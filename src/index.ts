import * as types from './actions/types';
import { authReducer } from './reducers/authReducer';
import { feedbackReducer } from './reducers/feedbackReducer';
import { friendReducer } from './reducers/friendReducer';
import { friendRequestReducer } from './reducers/friendRequestReducer';
import { soloStreakReducer } from './reducers/soloStreakReducer';
import { teamStreakReducer } from './reducers/teamStreakReducer';
import { userReducer } from './reducers/userReducer';
import { AppActions } from './actions/types';
import CognitoPayload from './actions/cognitoPayload';
import { emailActions } from './actions/emailActions';
import { feedbackActions } from './actions/feedbackActions';
import { friendRequestActions } from './actions/friendRequestActions';
import { soloStreakActions } from './actions/soloStreakActions';
import { stripeActions } from './actions/stripeActions';
import { teamMemberStreakTaskActions } from './actions/teamMemberStreakTaskActions';
import { teamStreakActions } from './actions/teamStreakActions';

const sharedReducers = {
    auth: authReducer,
    feedback: feedbackReducer,
    friends: friendReducer,
    friendRequests: friendRequestReducer,
    soloStreaks: soloStreakReducer,
    teamStreaks: teamStreakReducer,
    users: userReducer,
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
    AppActions,
    CognitoPayload,
    emailActions,
    feedbackActions,
    friendRequestActions,
    soloStreakActions,
    stripeActions,
    teamMemberStreakTaskActions,
    teamStreakActions,
};
