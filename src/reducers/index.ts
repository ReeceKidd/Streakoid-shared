import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { friendReducer } from './friendReducer';
import { userReducer } from './userReducer';
import { soloStreakReducer } from './soloStreakReducer';
import { feedbackReducer } from './feedbackReducer';
import { friendRequestReducer } from './friendRequestReducer';
import { teamStreakReducer } from './teamStreakReducer';

const rootReducer = combineReducers({
    teamStreaks: teamStreakReducer,
    friends: friendReducer,
    users: userReducer,
    soloStreaks: soloStreakReducer,
    auth: authReducer,
    feedback: feedbackReducer,
    friendRequests: friendRequestReducer,
});

export { rootReducer };

export type AppState = ReturnType<typeof rootReducer>;
