import { combineReducers } from 'redux';

import * as types from './actions/types';
import { authReducer } from './reducers/authReducer';
import { soloStreakReducer } from './reducers/soloStreakReducer';
import { teamStreakReducer } from './reducers/teamStreakReducer';
import { userReducer } from './reducers/userReducer';
import { streakRecommendationReducer } from './reducers/streakRecommendationsReducer';
import { challengeReducer } from './reducers/challengesReducer';
import { challengeStreakReducer } from './reducers/challengeStreakReducer';
import { noteReducer } from './reducers/notesReducer';
import { activityFeedReducer } from './reducers/activityFeedItemReducer';
import { teamMemberStreakReducer } from './reducers/teamMemberStreakReducer';
import { leaderboardReducer } from './reducers/leaderboardReducer';
import { contentReducer } from './reducers/contentReducer';
import { databaseStatsReducer } from './reducers/databaseStatsReducer';

import { AppActions } from './actions/types';
import { getAuthActions } from './actions/getAuthActions';
import { getSharedActions } from './actions/getSharedActions';
import CognitoPayload from './cognitoPayload';
import { getCountdownString } from './helpers/countdown/getCountdownString';
import { getIdToken } from './helpers/auth/getIdToken';
import { getStreakCompletionInfo } from './helpers/streakInfo/getStreakCompletionInfo';

const sharedReducers = {
    auth: authReducer,
    soloStreaks: soloStreakReducer,
    teamStreaks: teamStreakReducer,
    users: userReducer,
    streakRecommendations: streakRecommendationReducer,
    challenges: challengeReducer,
    challengeStreaks: challengeStreakReducer,
    notes: noteReducer,
    activityFeed: activityFeedReducer,
    teamMemberStreaks: teamMemberStreakReducer,
    leaderboards: leaderboardReducer,
    content: contentReducer,
    databaseStats: databaseStatsReducer,
};

const sharedReducer = combineReducers({
    ...sharedReducers,
});

export type AppState = ReturnType<typeof sharedReducer>;

export {
    types,
    sharedReducers,
    authReducer,
    soloStreakReducer,
    teamStreakReducer,
    teamMemberStreakReducer,
    userReducer,
    challengeReducer,
    challengeStreakReducer,
    noteReducer,
    AppActions,
    CognitoPayload,
    getAuthActions,
    getSharedActions,
    getCountdownString,
    getIdToken,
    getStreakCompletionInfo,
};
