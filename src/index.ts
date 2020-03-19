import { combineReducers } from 'redux';

import * as types from './actions/types';
import { authReducer } from './reducers/authReducer';
import { friendRequestReducer } from './reducers/friendRequestReducer';
import { soloStreakReducer } from './reducers/soloStreakReducer';
import { teamStreakReducer } from './reducers/teamStreakReducer';
import { userReducer } from './reducers/userReducer';
import { streakRecommendationReducer } from './reducers/streakRecommendationsReducer';
import { badgeReducer } from './reducers/badgesReducer';
import { challengeReducer } from './reducers/challengesReducer';
import { challengeStreakReducer } from './reducers/challengeStreakReducer';
import { noteReducer } from './reducers/notesReducer';
import { activityFeedItemReducer } from './reducers/activityFeedItemReducer';
import { teamMemberStreakReducer } from './reducers/teamMemberStreakReducer';
import { leaderboardReducer } from './reducers/leaderboardReducer';

import { AppActions } from './actions/types';
import { getSharedActions } from './actions/getSharedActions';
import CognitoPayload from './cognitoPayload';
import { getCountdownString } from './helpers/countdown/getCountdownString';
import { getIdToken } from './helpers/auth/getIdToken';
import { getStreakCompletionString } from './helpers/generatedText/getStreakCompletionString';

const sharedReducers = {
    auth: authReducer,
    friendRequests: friendRequestReducer,
    soloStreaks: soloStreakReducer,
    teamStreaks: teamStreakReducer,
    users: userReducer,
    streakRecommendations: streakRecommendationReducer,
    badges: badgeReducer,
    challenges: challengeReducer,
    challengeStreaks: challengeStreakReducer,
    notes: noteReducer,
    activityFeedItems: activityFeedItemReducer,
    teamMemberStreaks: teamMemberStreakReducer,
    leaderboards: leaderboardReducer,
};

const sharedReducer = combineReducers({
    ...sharedReducers,
});

export type AppState = ReturnType<typeof sharedReducer>;

export {
    types,
    sharedReducers,
    authReducer,
    friendRequestReducer,
    soloStreakReducer,
    teamStreakReducer,
    teamMemberStreakReducer,
    userReducer,
    badgeReducer,
    challengeReducer,
    challengeStreakReducer,
    noteReducer,
    AppActions,
    CognitoPayload,
    getSharedActions,
    getCountdownString,
    getIdToken,
    getStreakCompletionString,
};
